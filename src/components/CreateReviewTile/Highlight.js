import './createReviewTile.css'

/*
Props:
- type (enum):
    GOOD_MATCH
    FLEXIBLE
    FIXED
    NEW
*/
const Highlights = (props) => {

    return (
        <div id="GLHighlight">
            {props.text}
        </div>
    )
}

export default Highlights;