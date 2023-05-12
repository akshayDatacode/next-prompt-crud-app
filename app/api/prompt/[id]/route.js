import { conntectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, { params }) => {
  try {
    await conntectToDB()
    const prompt = await Prompt.findById(params.id).populate('creator')
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 })
    }
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
}

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json()

  try {
    await conntectToDB()
    const existingPrompts = await Prompt.findById(params.id)
    if (!existingPrompts) {
      return new Response("Promt not found", { status: 404 })
    }
    existingPrompts.prompt = prompt
    existingPrompts.tag = tag
    await existingPrompts.save()

    return new Response(JSON.stringify(existingPrompts), { status: 200 })
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await conntectToDB()
    await Prompt.findByIdAndRemove(params.id)

    return new Response("Promt Delete Successfully", { status: 200 })
  } catch (error) {
    return new Response("Failed to Delete prompt", { status: 500 })
  }
}