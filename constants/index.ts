import { MessageSquare , Code2 , Image, Video, FileAudio,LayoutDashboard, FilePenLine} from 'lucide-react'


export const DashboardItems = [
    {
        id: 0,
        color:"violet",
        route:"dashboard",
        name: 'Dashboard',
        description: 'All your assets at one place',
        icon:LayoutDashboard
    },
    {
    id: 1,
    color:"red",
    route:"conversation",
    name: 'Conversation',
    description: 'Generate text based on a prompt.',
    icon:MessageSquare
},{
    id: 2,
    name: 'Music Generation',
    color:"sky",
    route:"audio",
    description: 'Generate text based on a prompt.',
    icon:FileAudio
},{
    id: 4,
    color:"emerald",
    name: 'Image Generation',
    route:"image",
    description: 'Generate text based on a prompt.',
    icon:Image
},{
    id: 5,
    color:"orange",
    name: 'Code Generation',
    route:"code",
    description: 'Generate text based on a prompt.',
    icon:Code2
},{
    id: 5,  
    color:"purple",
    name: 'Ai Image Gallery',
    route:"image-transformations",
    description: "Let AI Transform assets for you.",
    icon:FilePenLine    
}
]



export const list = [
    {
      title: "Music Generation",
      description: "Create unique soundtracks and melodies with our advanced AI composer.",
      imageUrl:"https://image.pollinations.ai/prompt/an%20image%20depicting%20ai%20music%20generation%20using%20ai%20chatbot%20generating%20music%20%20with%20a%20input%20field%20ang%20music%20playing%20light%20purple%20background?width=832&height=608&seed=8528646&enhance=true&nologo=true&model=flux",
      effect:1
    },
    {
      title: "Image Transformations",
      description: "Transform your images with your creativity and the power of AI.",
      imageUrl:'https://image.pollinations.ai/prompt/an%20image%20demonstarting%20small%20and%20cute%20white%20box%20like%20ai%20bot%20transforming%20images%20ang%20making%20changes%20in%20images%20with%20light%20purple%20background?width=832&height=608&seed=8528690&enhance=true&nologo=true&model=flux',
      effect:1
    },
    {
      title: "Image Generation",
      description: "Generate photorealistic images and artwork from text descriptions.",
      imageUrl:"https://image.pollinations.ai/prompt/an%20image%20depicting%20ai%20image%20generation%20using%20ai%20chatbot%20light%20purple%20background?width=832&height=608&seed=8528635&enhance=true&nologo=true&model=flux",
      effect:1
    },
    {
      title: "AI Conversation",
      description: "Engage in natural conversations with our advanced AI chatbot.",
      imageUrl:'https://image.pollinations.ai/prompt/an%20image%20demonstarting%20ai%20chat%20generation%20using%20ai%20chatbot%20generating%20chats%20with%20a%20input%20field%20ang%20chat%20messages%20and%20user%20with%20ai%20conversation%20%20light%20purple%20background?width=832&height=608&seed=8528675&enhance=true&nologo=true&model=flux',
      effect:1
    },
    {
      title: "Code Generation",
      description: "Accelerate development with AI-powered code suggestions.",
      imageUrl:"https://image.pollinations.ai/prompt/an%20image%20demonstarting%20small%20and%20cute%20white%20box%20like%20ai%20bot%20writing%20code%20and%20generating%20code%20and%20ang%20making%20changes%20in%20images%20with%20light%20purple%20background?width=832&height=608&seed=8528696&enhance=true&nologo=true&model=flux",
      effect:1
    },
  ]
