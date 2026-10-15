import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const servicePrices: Record<string, number> = {
  "Personal message": 2000,
  "Personal call": 3000,
  "Written letter": 2500,
  "Letter + call": 5000,
  "International call": 6000,
};

const databaseServiceTypeMap: Record<string, string> = {
  "Personal message": "Message",
  "Personal call": "Call",
  "Written letter": "Letter",
  "Letter + call": "Letter + Call",
  "International call": "International Call",
};

const messageTypeMap: Record<string, string> = {
  "Love & Romance": "Love",
  "Birthday Wishes": "Birthday",
  "Apology Messages": "Apology",
  Encouragement: "Encouragement",
  "Letters & Poetry": "Poetry",
  "Calls & Special Moments": "Others",
  Other: "Others",
};

const allowedMessageTypes = new Set([
  "Love",
  "Birthday",
  "Apology",
  "Congratulatory",
  "Encouragement",
  "Poetry",
  "Asking Out",
  "Checking Up",
  "Loyalty",
  "Anniversary",
  "Others",
]);

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const body = await req.json();

    const customerName = String(body.customerName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const recipientName = String(body.recipientName ?? "").trim();
    const recipientPhone = String(body.recipientPhone ?? "").trim();
    const service = String(body.service ?? "").trim();
    const submittedMessageType = String(body.messageType ?? "").trim();
    const delivery = String(body.delivery ?? "").trim();
    const instructions = String(body.instructions ?? "").trim();
    const preferredDeliveryAt = String(
      body.preferredDeliveryAt ?? "",
    ).trim();

    if (
      !customerName ||
      !email ||
      !phone ||
      !recipientName ||
      !instructions ||
      !service ||
      !submittedMessageType ||
      !preferredDeliveryAt
    ) {
      return jsonResponse(
        { error: "Please complete all required booking fields." },
        400,
      );
    }

    if (
      customerName.length > 120 ||
      recipientName.length > 120 ||
      email.length > 254 ||
      phone.length > 40 ||
      recipientPhone.length > 40 ||
      instructions.length > 5000
    ) {
      return jsonResponse(
        { error: "One or more fields exceed the allowed length." },
        400,
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: "Enter a valid email address." }, 400);
    }

    if (!(service in servicePrices)) {
      return jsonResponse({ error: "Invalid service selection." }, 400);
    }

    const messageType =
      messageTypeMap[submittedMessageType] ?? submittedMessageType;

    if (!allowedMessageTypes.has(messageType)) {
      return jsonResponse({ error: "Invalid message type." }, 400);
    }

    if (delivery !== "standard" && delivery !== "urgent") {
      return jsonResponse({ error: "Invalid delivery preference." }, 400);
    }

    const deliveryDate = new Date(preferredDeliveryAt);

    if (Number.isNaN(deliveryDate.getTime())) {
      return jsonResponse(
        { error: "Choose a valid preferred delivery date and time." },
        400,
      );
    }

    const now = Date.now();
    const minimumTime =
      now + (delivery === "standard" ? 3 * 60 * 60 * 1000 : 0);

    if (deliveryDate.getTime() < minimumTime) {
      return jsonResponse(
        {
          error:
            delivery === "standard"
              ? "Standard delivery must be scheduled at least three hours ahead."
              : "Choose a future time for your urgent request.",
        },
        400,
      );
    }

    const urgentFee = delivery === "urgent" ? 1000 : 0;
    const amountNgn = servicePrices[service] + urgentFee;

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Required server environment variables are missing.");
      return jsonResponse(
        { error: "Booking service is not configured. Please try again later." },
        500,
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await supabase
      .from("bpv_requests")
      .insert({
        customer_name: customerName,
        customer_email: email,
        customer_phone: phone,
        recipient_name: recipientName,
        recipient_phone: recipientPhone || null,
        service_type: messageType,
        message_type: databaseServiceTypeMap[service],
        delivery_type: delivery,
        preferred_delivery_at: deliveryDate.toISOString(),
        instructions,
        amount_ngn: amountNgn,
        payment_method: "OPay",
        payment_status: "unpaid",
        request_status: "pending",
      })
      .select(
        "id, booking_reference, amount_ngn, payment_status, request_status, preferred_delivery_at",
      )
      .single();

    if (error) {
      console.error("Booking insert failed:", error.message);
      return jsonResponse(
        { error: "We could not save your request. Please try again later." },
        500,
      );
    }

    return jsonResponse({
      success: true,
      booking: data,
      message:
        "Your request has been received. Payment remains pending until BPV verifies it.",
    }, 201);
  } catch (error) {
    console.error(
      "Booking request failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return jsonResponse({ error: "Invalid request. Please check your details." }, 400);
  }
});
