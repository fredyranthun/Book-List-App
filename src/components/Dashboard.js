import React, { useEffect, useState, useRef } from 'react'
import { Card, Button, Alert, Form, Table } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router'
import { database } from '../API/firebase'

export const Dashboard = () => {

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [bookList, setBookList] = useState(null)
    const bookRef = useRef()
    const authorRef = useRef()
    const editRef = useRef()
    const editionRef = useRef()
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleLogout = async () => {
        setError('')

        try {
            await logout()
            history.pushState('/login')
        } catch {
            setError("Não foi possível sair.")
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            console.log(bookRef)
            const bookBaseRef = database.ref('Book')
            const newBook = bookBaseRef.push()
            newBook.set({
                name: bookRef.current.value,
                author: authorRef.current.value,
                editor: editRef.current.value,
                edition: editionRef.current.value,
                user: currentUser.uid
            })
            setMessage('Livro foi adicionado à sua lista.')
        } catch {
            setError('Não foi possível adicionar o livro à sua lista.')
        }
    }

    useEffect(() => {
        const bookBaseRef = database.ref('Book')
        bookBaseRef.on('value', snapshot => {
            const data = snapshot.val()
            let bookArray = []
            for (const key in data) {
                bookArray.push(data[key])
            }
            setBookList(bookArray)
        })

    }, [])

    return (
        <React.Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Seja bem vindo, {currentUser.email}!</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleAdd}>
                        <p className="text-center mb-4">Quer adicionar um livro à sua lista?</p>
                        <Form.Group className="mb-3" id="name">
                            <Form.Label>Nome do livro:</Form.Label>
                            <Form.Control type="text" ref={bookRef} required />
                        </Form.Group>
                        <Form.Group className="mb-3" id="name">
                            <Form.Label>Autor do livro:</Form.Label>
                            <Form.Control type="text" ref={authorRef} required />
                        </Form.Group>
                        <Form.Group className="mb-3" id="name">
                            <Form.Label>Editora:</Form.Label>
                            <Form.Control type="text" ref={editRef} required />
                        </Form.Group>
                        <Form.Group className="mb-3" id="name">
                            <Form.Label>Edição:</Form.Label>
                            <Form.Control type="text" ref={editionRef} required />
                        </Form.Group>
                        <Button type="submit" className="my-4 w-100">
                            Adicionar um livro
                        </Button>
                    </Form>
                    <h3 className="text-center mb-4">Sua lista de livros</h3>
                    {bookList ?
                        (<Table striped bordered hover responsive>
                            <tr>
                                <th>Ordem</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Editora</th>
                                <th>Edição</th>
                            </tr>
                            {bookList.map((elem, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{elem.name}</td>
                                    <td>{elem.author}</td>
                                    <td>{elem.editor}</td>
                                    <td>{elem.edition}</td>
                                </tr>))
                            }
                        </Table>) :
                        (<p className="text-center">Não há livros para serem exibidos.</p>)}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant='link' onClick={handleLogout}>
                    Sair
                </Button>
            </div>
        </React.Fragment>
    )
}
