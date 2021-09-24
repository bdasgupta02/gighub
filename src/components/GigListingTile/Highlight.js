import './gigListingTile.css'

/*
Props:
- type (enum):
    GOOD_MATCH
    FLEXIBLE
    FIXED
    NEW
*/
const Highlights = (props) => {
    let text = ""
    switch (props.type) {
        case "GOOD_MATCH":
            text = "GOOD MATCH"
            break;
        default:
            text = props.type;
            break;
    }

    return (
        <div id="Highlight">
            {text}
        </div>
    )
}

export default Highlights;