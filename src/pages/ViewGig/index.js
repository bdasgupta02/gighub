import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import GigDetails from "../../components/GigDetails/index"

export default function ViewGig(props) {
    const location = useLocation().state

    return (
        <div>
            <GigDetails />
        </div>
    );
}