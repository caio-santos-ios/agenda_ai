"use client"

import "dotenv/config"
import { apiLogin } from "@/services/api";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export const FormAuth = () => {
    const [auth, setAuth] = useState({email: "", password: "" })
    const [name, setName] = useState({name: ""})
    const [passwordOn, setPasswordOn] = useState(false)
    const [typeForm, setTypeForm] = useState(true)

    const router = useRouter()
    
    useEffect(() => {
        const spans = document.querySelectorAll('span')
        const inputs = document.querySelectorAll('input')
        inputs.forEach((input, i) => {
            input.addEventListener("focus", () => {

                if(typeForm){
                    if(i === 0) {
                        spans[i].innerText = "E-mail"
                        input.placeholder = ""
                        
                        spans[1].innerText = ""
                        inputs[1].placeholder = "Senha"
                    }
                    
                    if(i === 1) {
                        spans[i].innerText = "Senha"
                        input.placeholder = ""
                        
                        spans[0].innerText = ""
                        inputs[0].placeholder = "E-mail"
                    }
                }else {
                    if(i === 0){
                        spans[i].innerText = "Nome"
                        input.placeholder = ""

                        spans[1].innerText = ""
                        inputs[1].placeholder = "E-mail"

                        spans[2].innerText = ""
                        inputs[2].placeholder = "Senha"
                    }

                    if(i === 1) {
                        spans[i].innerText = "E-mail"
                        input.placeholder = ""
                        
                        spans[0].innerText = ""
                        inputs[0].placeholder = "Nome"  

                        spans[2].innerText = ""
                        inputs[2].placeholder = "Senha"
                    }
                    
                    if(i === 2) {
                        spans[i].innerText = "Senha"
                        input.placeholder = ""
                        
                        spans[0].innerText = ""
                        inputs[0].placeholder = "Nome"

                        spans[1].innerText = ""
                        inputs[1].placeholder = "E-mail"
                    }
                }

            })
        })
    }, [typeForm])

    const login = async (e: any) => {
        e.preventDefault()
        
        console.log(auth)
        console.log(name)    
        try {
            if(typeForm) {
                const res = await apiLogin.post("/accounts/login", auth)
                router.push("/home")
                console.log(res)
            }else {
                const res = await apiLogin.post("/accounts", {...auth, ...name})
                console.log(res)
            }
        } catch (error) {           
            console.log(error)
        }
    }

    return (
        <div className="flex gap-2 flex-col">
            <form onSubmit={login} className="flex flex-col gap-2 bg-slate-500 p-2">
                {
                    !typeForm && 
                    <label className="label_auth" htmlFor="name">
                        <span className="title_auth"></span>
                        <input onChange={(e) => setName({name: e.currentTarget.value})} className="input_auth" type="text" placeholder="Nome" />
                    </label>
                }

                <label className="label_auth" htmlFor="email">
                    <span className="title_auth"></span>
                    <input onChange={(e) => setAuth({ email: e.currentTarget.value, password: auth.password })} className="input_auth" name="email" type="text" placeholder="E-mail" />
                </label>    
            
                <label className="label_auth" htmlFor="password">
                    <span className="title_auth"></span>
                    <input onChange={(e) => setAuth({ email: auth.email, password: e.currentTarget.value })} className="input_auth" name="password" type={ passwordOn ? "text" : "password"} placeholder="Senha" />
                    <button className="absolute bottom-3 right-2" type="button" onClick={() => setPasswordOn(!passwordOn)}>
                        {
                            passwordOn ?
                            <FaEyeSlash />
                            : 
                            <FaEye />
                        }
                    </button>
                </label>
                <button className="btn_auth" type="submit">{ typeForm ? "Fazer login" : "Cadastrar" }</button>
            </form>
            
            <p className="text-center text-sm">
                Não tem conta?
                <button onClick={() => setTypeForm(!typeForm)} type="button" className="text-blue-500 ml-1">{ typeForm ? "Cadastrar-se" : "Logar"}</button>
            </p>
        </div>
    )
}