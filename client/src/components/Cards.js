import React from "react"

function Cards(props) {
  const [switchCard, setSwitchCard] = React.useState(false)

  function handleSwitch() {
    setSwitchCard((prev) => !prev)
  }

  return (
    <div className="card-con" id={props.bistro.id} >
      {!switchCard ?
        <>
          <div className="bistro-img-con" onClick={handleSwitch}>
            <img src={props.bistro.image} className="bistro-img" title="More info for this Bistro" alt={props.bistro.name} />
          </div>

          <div className="bistro-text-con">
            <div className="bistro-name">
              <h5>
                {props.bistro.name}
                <a href={props.bistro.google_map} title="Google map" target="_blank" rel="noreferrer">
                  <i className="fas fa-map-marker-alt"></i>
                </a>
              </h5>
            </div>

            <span className="bistro-category">
              <i className="fas fa-utensils pr-2"></i> {props.bistro.category}
            </span>

            <div className="bistro-rating">
              <span>
                {props.bistro.rating} <i className="fas fa-star fa-xs"></i>
              </span>
              <span className="favorite" onClick={props.handleClickFav}>
                {
                  props.fav.some((element) => element === props.bistro.id) ?
                    <i className="fas fa-check" title="This Bistro is in your favorite list"></i> :
                    <i className="fas fa-heart" title="Add to favorite list"></i>
                }
              </span>
            </div>
          </div>
        </> :
        <>
          <div className="bistro-detail-con">
            <i className="fas fa-angle-left" onClick={handleSwitch}></i>
            <div className="bistro-info">
              <h4>{props.bistro.name}</h4>
              <h5><i className="fas fa-phone-alt"></i>{props.bistro.phone}</h5>
              <h5><i className="fas fa-map-marker-alt"></i>{props.bistro.location}</h5>
              <p><i className="fas fa-pen"></i>{props.bistro.description}</p>
            </div>
          </div>
        </>
      }
    </div >
  )
}

export default Cards