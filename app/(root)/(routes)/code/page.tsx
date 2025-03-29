// "use client";
// import Header from "@/components/Header";
// import Loader from "@/components/Loader";
// import {
//   Code2,
//   SendHorizonal,
//   User,
//   Bot,
//   Save,
//   Trash2,
//   ChevronDown,
//   ChevronUp,
//   Copy,
//   Check,
// } from "lucide-react";
// import React, { useEffect, useState, useRef } from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";


// import { toast } from "react-toastify";
// import { useUser } from "@clerk/nextjs";

// const Code = () => {
//   const [prompt, setPrompt] = useState<string>("");
//   const [code, setCode] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [messages, setMessages] = useState<
//     { user: string; response: string; isSaved?: boolean }[]
//   >([]);
//   const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
//   const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>(
//     {}
//   );
//   const conversationRef = useRef<HTMLDivElement>(null);

//   const userInfo = useUser();
//   const historyRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedMessages = localStorage.getItem("conversationMessages");
//       const storedCode = localStorage.getItem("lastGeneratedCode");

//       if (storedMessages) {
//         try {
//           const parsedMessages = JSON.parse(storedMessages);
//           if (Array.isArray(parsedMessages)) {
//             setMessages(parsedMessages);
//           }
//         } catch (error) {
//           console.error("Error parsing messages from localStorage:", error);
//         }
//       }

//       if (storedCode) {
//         setCode(storedCode);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       if (messages.length > 0) {
//         localStorage.setItem("conversationMessages", JSON.stringify(messages));
//       }

//       if (code) {
//         localStorage.setItem("lastGeneratedCode", code);
//       }
//     }

//     if (conversationRef.current) {
//       conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
//     }
//   }, [messages, code]);

//   useEffect(() => {
//     if (isHistoryOpen && historyRef.current) {
//       historyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [isHistoryOpen]);

//   const toggleHistory = () => {
//     setIsHistoryOpen(!isHistoryOpen);
//   };

//   const cleanCode = (code: string) => {
//     return code.replace(/^```[a-z]*\n/, "").replace(/\n```$/, "");
//   };

//   const handleCopyCode = async (text: string, index: number) => {
//     try {
//       await navigator.clipboard.writeText(cleanCode(text));
//       setCopiedStates({ ...copiedStates, [index]: true });
//       toast.success("Code copied to clipboard!");

//       setTimeout(() => {
//         setCopiedStates({ ...copiedStates, [index]: false });
//       }, 2000);
//     } catch (err) {
//       toast.error("Failed to copy code");
//     }
//   };

//   return (
//     <div className="pt-16 pl-4 pr-4 md:pl-64 md:ml-4 min-h-screen">
//       <Header
//         title="Code Generation"
//         description="Generates code by leveraging the power of AI"
//         icon={Code2}
//         iconColor="orange"
//         bgColor="orange"
//       />
//       {loading && <Loader />}
//       {code && (
//         <div className="relative mt-4 mx-1 rounded-lg w-full bg-slate-800 p-4 shadow-lg overflow-auto">
//           <button
//             onClick={() => handleCopyCode(code, -1)}
//             className="absolute top-2 right-2 p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors duration-200"
//           >
//             {copiedStates[-1] ? <Check size={16} /> : <Copy size={16} />}
//           </button>
//           <SyntaxHighlighter language="javascript" style={vscDarkPlus} showLineNumbers>
//             {cleanCode(code)}
//           </SyntaxHighlighter>
//         </div>
//       )}
//       <div ref={historyRef} className="w-full">
//         <div className="cursor-pointer p-4 bg-white shadow-lg rounded-t-lg flex justify-between items-center" onClick={toggleHistory}>
//           <h3 className="text-2xl font-bold text-slate-800">Conversation History</h3>
//           {isHistoryOpen ? <ChevronUp /> : <ChevronDown />}
//         </div>
//         {isHistoryOpen && (
//           <div className="rounded-b-lg bg-white shadow-lg max-h-[60vh] overflow-y-auto" ref={conversationRef}>
//             {messages.map((msg, index) => (
//               <div key={index} className="p-4 border-b border-gray-200 animate-fadeIn">
//                 <div className="bg-orange-100 p-3 rounded-lg shadow-sm">
//                   <strong className="text-orange-700">User:</strong>
//                   <p className="text-slate-800">{msg.user}</p>
//                 </div>
//                 <div className="bg-slate-100 p-3 rounded-lg shadow-sm mt-2 relative">
//                   <strong className="text-slate-700">AI:</strong>
//                   <button
//                     onClick={() => handleCopyCode(msg.response, index)}
//                     className="absolute top-2 right-2 p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors duration-200"
//                   >
//                     {copiedStates[index] ? <Check size={16} /> : <Copy size={16} />}
//                   </button>
//                   <div className="mt-2 rounded-lg bg-slate-700 p-3 overflow-auto">
//                     <SyntaxHighlighter language="javascript" style={vscDarkPlus} showLineNumbers>
//                       {cleanCode(msg.response)}
//                     </SyntaxHighlighter>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Code;
"use client"

import Header from "@/components/Header"
import Loader from "@/components/Loader"
import { Code2, SendHorizonal, User, Bot, Save, Trash2, ChevronDown, ChevronUp, Copy, Check } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { toast } from "react-toastify"
import { useUser } from "@clerk/nextjs"
import axios from "axios"

const Code = () => {
  const [prompt, setPrompt] = useState<string>("")
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<{ user: string; response: string; isSaved?: boolean }[]>([])
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false)
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({})
  const conversationRef = useRef<HTMLDivElement>(null)

  const userInfo = useUser()
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMessages = localStorage.getItem("conversationMessages")
      const storedCode = localStorage.getItem("lastGeneratedCode")

      if (storedMessages) {
        try {
          const retainedMessages = JSON.parse(storedMessages)
          const parsedMessages = retainedMessages.reverse()
          if (Array.isArray(parsedMessages)) {
            setMessages(parsedMessages)
          }
        } catch (error) {
          console.error("Error parsing messages from localStorage:", error)
        }
      }

      if (storedCode) {
        setCode(storedCode)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (messages.length > 0) {
        localStorage.setItem("conversationMessages", JSON.stringify(messages))
      }

      if (code) {
        localStorage.setItem("lastGeneratedCode", code)
      }
    }

    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight
    }
  }, [messages, code])

  useEffect(() => {
    if (isHistoryOpen && historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [isHistoryOpen])

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen)
  }

  const cleanCode = (code: string) => {
    return code.replace(/^```[a-z]*\n/, "").replace(/\n```$/, "")
  }

  const handleCopyCode = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(cleanCode(text))
      setCopiedStates({ ...copiedStates, [index]: true })
      toast.success("Code copied to clipboard!")

      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [index]: false })
      }, 2000)
    } catch (err) {
      toast.error("Failed to copy code")
    }
  }

  const handleGenerate = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userPrompt: prompt,
          email: userInfo?.user?.primaryEmailAddress?.emailAddress,
        }),
      })

      const data = await response.json()
      console.log("API Response:", data)

      if (!response.ok) {
        if (data.error === "Insufficient credits.") {
          toast.error("You do not have enough credits to generate code.")
        } else {
          console.log("Error not matched:", data.error)
        }
        return
      }

      if (data.remainingCredits === 0) {
        toast.warning("You have no remaining credits.")
      }

      const generatedCode = data.text
      setCode(generatedCode)

      setMessages((prevMessages) => [...prevMessages, { user: prompt, response: generatedCode }])

      setPrompt("")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (index: number) => {
    const { user, response, isSaved } = messages[index]

    if (isSaved) return

    try {
      const res = await axios.post("/api/save-code", {
        prompt: user,
        code: response,
        email: userInfo?.user?.primaryEmailAddress?.emailAddress,
      })

      const updatedMessages = [...messages]
      updatedMessages[index].isSaved = true
      setMessages(updatedMessages)
      toast.success("Code saved successfully!")
    } catch (error) {
      console.error("Error saving message:", error)
      toast.error("Failed to save the message.")
    }
  }

  const handleDelete = (index: number) => {
    const updatedMessages = [...messages]
    updatedMessages.splice(index, 1)
    setMessages(updatedMessages)
  }

  return (
    <div className="pt-16 pl-4 pr-4 md:pl-64 md:ml-4 min-h-screen">
      <Header
        title="Code Generation"
        description="Generates code by leveraging the power of AI"
        icon={Code2}
        iconColor="orange"
        bgColor="orange"
      />
      <div className="flex items-center bg-slate-50 lg:w-[60%] w-full rounded-lg shadow-lg flex-wrap pb-4 pt-4 md:p-0 gap-6 justify-between">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Generate Hello World code"
            className="p-3 lg:p-4 m-3 bg-slate-100 rounded-md outline-none flex-grow"
          />
          <button
          disabled={loading}
            className="mr-4 bg-orange-500 text-white text-lg p-2 rounded-md font-bold lg:p-3 shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerate}
          >
            {loading ? "Generating..." : "Generate"}
            <SendHorizonal size={16} />
          </button>
        </div>
      {loading && <Loader />}
      {code && (
        <div className="relative mt-4 mx-1 rounded-lg w-full bg-slate-800 p-4 shadow-lg overflow-auto">
          <button
            onClick={() => handleCopyCode(code, -1)}
            className="absolute top-2 right-2 p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors duration-200"
          >
            {copiedStates[-1] ? <Check size={16} /> : <Copy size={16} />}
          </button>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} showLineNumbers>
            {cleanCode(code)}
          </SyntaxHighlighter>
        </div>
      )}
      <div ref={historyRef} className="w-full mt-8">
        <div
          className="cursor-pointer p-4 bg-white shadow-lg rounded-t-lg flex justify-between items-center"
          onClick={toggleHistory}
        >
          <h3 className="text-2xl font-bold text-slate-800">Conversation History</h3>
          {isHistoryOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
        {isHistoryOpen && (
          <div className="rounded-b-lg bg-white shadow-lg max-h-[60vh] overflow-y-auto" ref={conversationRef}>
            {messages.map((msg, index) => (
              <div key={index} className="p-4 border-b border-gray-200 animate-fadeIn">
                <div className="bg-orange-100 p-3 rounded-lg shadow-sm">
                  <strong className="text-orange-700 flex items-center">
                    <User className="mr-2" size={16} />
                    User:
                  </strong>
                  <p className="text-slate-800 mt-2">{msg.user}</p>
                </div>
                <div className="bg-slate-100 p-3 rounded-lg shadow-sm mt-2 relative">
                  <strong className="text-slate-700 flex items-center">
                    <Bot className="mr-2" size={16} />
                    AI:
                  </strong>
                  <button
                    onClick={() => handleCopyCode(msg.response, index)}
                    className="absolute top-2 right-2 p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors duration-200"
                  >
                    {copiedStates[index] ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <div className="mt-2 rounded-lg bg-slate-700 p-3 overflow-auto">
                    <SyntaxHighlighter language="javascript" style={vscDarkPlus} showLineNumbers>
                      {cleanCode(msg.response)}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    onClick={() => handleSave(index)}
                    className={`p-2 rounded-md ${msg.isSaved ? "bg-green-500" : "bg-blue-500"} text-white hover:opacity-80 transition-opacity duration-200 flex items-center`}
                  >
                    <Save size={16} className="mr-1" />
                    {msg.isSaved ? "Saved" : "Save"}
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 rounded-md bg-red-500 text-white hover:opacity-80 transition-opacity duration-200 flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Code

