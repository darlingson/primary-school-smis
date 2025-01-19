import { H3Event, createError } from "h3";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface SignUpRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
}

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default defineEventHandler(async (event: H3Event) => {
  const body: SignUpRequest = await readBody(event);

  if (!body.email || !body.password || !body.firstname || !body.lastname) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email, password, firstname, and lastname are required.",
    });
  }
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", body.email)
    .single();

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "Email is already registered.",
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const { data: newUser, error } = await supabase
    .from("users")
    .insert({
      email: body.email,
      password: hashedPassword,
      firstname: body.firstname,
      lastname: body.lastname,
      role: body.role,
    })
    .select("*")
    .single();

  if (error || !newUser) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create user. Please try again.",
    });
  }

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      role: newUser.role,
    },
  };
});
