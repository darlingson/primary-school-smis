import { H3Event, createError } from "h3";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface LoginRequest {
  email: string;
  password: string;
}

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default defineEventHandler(async (event: H3Event) => {
  const body: LoginRequest = await readBody(event);

  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required.",
    });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", body.email)
    .single();

  if (error || !user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials.",
    });
  }

  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials.",
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    },
  };
});
