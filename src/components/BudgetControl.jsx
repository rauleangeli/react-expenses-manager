import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"



const BudgetControl = ({ budget, expenses, setExpenses, setBudget, setIsValidBudget }) => {

    const [percentage, setPercentage] = useState(0)
    const [available, setAvailable] = useState(0)
    const [expended, setExpended] = useState(0)


    useEffect(() => {
        const totalExpended = expenses.reduce((total, expense) => expense.amount + total, 0);
        const totalAvailable = budget - totalExpended;

        //Calcular el porcentaje gastado
        const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2);

        setAvailable(totalAvailable);
        setExpended(totalExpended);

        setTimeout(() => {
            setPercentage(newPercentage);
        }, 500);
    }, [expenses])


    const formatQuantity = (amount) => {
        return amount.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR'
        });
    }

    const handleResetApp = ()=>{
        const confirmation = confirm('Do  you wish to reset the budget and expenses?')

        if(confirmation){
            setExpenses([])
            setBudget(0)
            setIsValidBudget(false)
        }
    }
    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={percentage}
                    text={`${percentage}% expended`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app" type="button"
                    onClick={handleResetApp}>
                    Reset app
                </button>
                <p>
                    <span>Budget: </span>{formatQuantity(budget)}
                </p>
                <p className={`${available < 0 ? 'negativo' : ''}`}>
                    <span>Available: </span>{formatQuantity(available)}
                </p>
                <p>
                    <span>Expended: </span>{formatQuantity(expended)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl