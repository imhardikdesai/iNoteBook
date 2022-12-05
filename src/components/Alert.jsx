import React from 'react'

function Alert(props) {
    const toCapitalize = (word) => {
        if (word === 'danger') {
            word = 'Error'
        }
        const newWord = word.toLowerCase();
        return newWord.charAt(0).toUpperCase() + newWord.slice('1');
    }
    return (
        <div style={{ height: '45px' }}>
            {
                props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{toCapitalize(props.alert.type)}</strong>: {props.alert.msg}
                </div>
            }
        </div>
    )
}

export default Alert;