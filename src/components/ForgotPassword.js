import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export const ForgotPassword = () => {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Verifique sua caixa de email.')
        } catch {
            setError('Não foi possível redefinir a senha.')
        }
        setLoading(false)
    }



    return (
        <React.Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Definir senha</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" id="email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Button disabled={loading} className="w-100" type="submit">
                            Cadastrar senha.
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Faça seu login.</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Precisa fazer uma conta? <Link to="/signup">Clique aqui!</Link>
            </div>
        </React.Fragment>
    )
}
