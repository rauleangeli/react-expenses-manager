import { useState, useEffect } from "react";
import Message from './Message';

import CloseButton from "../img/close.svg";

const Modal = ({ setModal, animateModal, setAnimateModal, saveExpense, editExpense, setEditExpense }) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');
    const [date, setDate] = useState('')


    useEffect(() => {
        if (Object.keys(editExpense).length > 0) {
            setName(editExpense.name);
            setAmount(editExpense.amount);
            setCategory(editExpense.category);
            setId(editExpense.id);
            setDate(editExpense.date)
        }
    }, [])

    const hideModal = () => {
        setAnimateModal(false);
        setEditExpense({})
        setTimeout(() => {
            setModal(false);
        }, 250);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if ([name, amount, category].includes('')) {
            setMessage('All fields are mandatory');

            setTimeout(() => {
                setMessage('')
            }, 3000);
            return;
        }

        saveExpense({ name, amount, category, id, date })
    }
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={CloseButton} alt="cerrar modal"
                    onClick={hideModal}
                />
            </div>
            <form
                onSubmit={handleSubmit}
                className={`formulario ${animateModal ? "animar" : 'cerrar'}`}
            >
                <legend>{editExpense.nombre ? "Edit expense" : "New expense"}</legend>
                {message && <Message type="error">{message}</Message>}
                <div className="campo">
                    <label htmlFor="nombre">Expense Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Add a title for your expense"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Add the amount:"
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="savings">Savings</option>
                        <option value="food">Food</option>
                        <option value="house">House</option>
                        <option value="expenses">Misc. Expenses</option>
                        <option value="fun">Fun</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value={editExpense.name ? "Save changes" : "Add expense"}
                />
            </form>
        </div>
    )
}

export default Modal