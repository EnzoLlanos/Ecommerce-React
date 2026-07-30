import "./Alert.scss"

export function Alert({alert,onClose,}){
  
  if(!alert.visible) return null

  return(
    <div className="alert-overlay">

      <div className={`alert alert--${alert.type}`}>
        <div  className="alert__content">
          <h4>{alert.title}</h4>
          <p>{alert.message}</p>
        </div>

        {onClose && (
          <button onClick={onClose} className="alert__close" >Aceptar</button>
        )}
      </div>
    </div>
  )
}