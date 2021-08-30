import "./style/index.scss";

export const Card = ({setModalActive, setCardData, value}) => {

    const handleClick = () => {
        setModalActive(true)
        setCardData(value)
    }

    return (
        <div className="card">
            <p className="card__category category">{value.category}</p>
            <h2 className="card__name">{value.name}</h2>
            <div className="card__footer">
                <span className="card__price price">{value.price}</span>
                <button className="button button--samll card__button" onClick={handleClick}>Buy</button>
            </div>
        </div>
    )
}