

const Circle = ({time,label}) => {
    return (
            <div className="circle mx-1 text-center rounded-circle p-2  bg-secondary shadow">
                <span className="fw-bold d-block text-danger mb-0">{time}</span>
                <small className="m-0">{label}</small>
            </div>
    )
}

export default Circle