import React, {useState} from 'react';
import styles from './navButton.css';
import  * as Constants from '../../constants.js';

const NavButton = ({buttonText, icon, isActive}) => {
  const [
		hover,
		setHover
	] = useState(false);

	const toggleHover = () => { setHover(!hover);};

	const activeStyle = {
		border          : `1px solid #00000000`,
		color           : 'white',
		backgroundColor : Constants.LIGHT_BLUE,
    borderRadius : '8px',
    height: '48px',
    paddingHorizontal: '26px',
    paddingVertical: '16px',
    fontWeight: 'bold',
    fontSize: '14px'
	};

  const inactiveStyle = {
		border          : `1px solid #00000000`,
		color           : Constants.GREY,
		backgroundColor : '#00000000',
    borderRadius : '8px',
    height: '48px',
    paddingHorizontal: '26px',
    paddingVertical: '16px',
    fontWeight: 'bold',
    fontSize: '14px'
	};
	const HoverStyle = {
    border          : `1px solid #00000000`,
		color           : Constants.GREY,
		backgroundColor : 'white',
    borderRadius : '8px',
    height: '48px',
    paddingHorizontal: '26px',
    paddingVertical: '16px',
    fontWeight: 'bold',
    fontSize: '14px'
	};

	let btnStyle;
  let type;
	switch (type) {
		case 'inactive':
			if (hover) {
				btnStyle = HoverStyle;
			}
			else {
				btnStyle = inactiveStyle;
			}
			break;
    case 'active':
			if (hover) {
				btnStyle = HoverStyle;
			}
			else {
				btnStyle = activeStyle;
			}
			break;
		default:
      if (hover) {
        btnStyle = HoverStyle;
      }
      else {
        btnStyle = inactiveStyle;
      }
			break;
	}
	return (
		<button
			style={btnStyle}

			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}

			type={isActive == null ? 'active' : 'inactive'}
			onClick={() => {}}
			className={styles.navbutton}
		>
			{buttonText}
		</button>
	);
};
export default NavButton;
