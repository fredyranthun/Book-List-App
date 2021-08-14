import React, { useEffect, useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { database } from '../API/firebase'
import { nanoid } from 'nanoid'


export const SignUp = () => {

    const nameRef = useRef()
    const photoRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const { signUp } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const PushUser = () => {
        const userRef = database.ref('User')
        const newUser = userRef.push()
        newUser.set({
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            photo: photoRef.current.value,
            id: nanoid()
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('As senhas precisam ser iguais.')
        }
        try {
            PushUser()
        } catch {
            setError('Erro ao salvar usuário.')
        }

        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)

            history.push('/')
        } catch {
            setError('Não foi possível criar uma conta.')
        }
        setLoading(false)

    }


    return (
        <React.Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up!</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" id="name">
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control type="text" ref={nameRef} required />
                        </Form.Group>

                        <Form.Group className="mb-3" id="photo">
                            <Form.Label>Foto</Form.Label>
                            <Form.Control type="file" ref={photoRef} />
                        </Form.Group>

                        <Form.Group className="mb-3" id="email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group className="mb-3" id="password">
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Form.Group className="mb-3" id="confirmPassword">
                            <Form.Label>Confirme sua senha:</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Já tem conta? <Link to="/login">Faça seu login.</Link>
            </div>
        </React.Fragment>
    )
}
