import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css";

import { formatDate } from "../helpers";


import IconSavings from '../img/icon_savings.svg';
import IconFood from '../img/icon_food.svg';
import IconHouse from '../img/icon_house.svg';
import IconExpenses from '../img/icon_expenses.svg';
import IconFun from '../img/icon_fun.svg';
import IconHealth from '../img/icon_health.svg';
import IconSubscriptions from '../img/icon_subscriptions.svg';


const mapped_icons = {
    savings: IconSavings,
    food: IconFood,
    house: IconHouse,
    expenses: IconExpenses,
    fun: IconFun,
    health: IconHealth,
    subscriptions: IconSubscriptions
}

const Expense = ({ expense, setEditExpense, deleteExpense }) => {
    const { category, name, amount, id, date } = expense;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditExpense(expense)}>
                Edit
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => deleteExpense(id)}
            destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img
                            src={mapped_icons[category]}
                            alt="expense icon"
                        />
                        <div className="descripcion-gasto">
                            <p className="categoría">{category}</p>
                            <p className="nombre-gasto">{name}</p>
                            <p className="fecha-gasto">{formatDate(date)}</p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">€{amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expense