import React from "react";
import Icon from "@material-ui/core/Icon";
import TextArea from "react-textarea-autosize";
import Card from '@material-ui/core/Card';
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";

class TrelloActionButton extends React.Component {

    //Definimos los estados
    state = {
        formOpen: false
    };

    openForm = () => {
        this.setState({
            formOpen: true
        });
    }

    closeForm = (e) => {
        this.setState({
            formOpen: false
        });
    }

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        });
    };

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;

        if (text) {

            this.setState({
                text: ""
            });

            dispatch(addList(text));
        }

        return;
    }

    handleAddCard = () => {
        const { dispatch, listID } = this.props;
        const { text } = this.state;

        if (text) {

            this.setState({
                text: ""
            });
            
            dispatch(addCard(listID, text));
        }

        return;
    }
    //Renderiza botón para añadir una nueva lista / tarjeta
    renderAddButton = () => {
        const {list} = this.props;

        const buttonText = list ? "Añadir otra lista" : "Añadir otra tarjeta";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

        return (
            <div
                onClick={this.openForm}
                style={{
                    ...styles.openFormButtonGroup,
                    opacity: buttonTextOpacity,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground
                }}
            >
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        );

    };

    //Renderiza el contenido que mostrará el botón [renderAddButton()] cuando se le pulse
    renderForm = () => {
        const {list} = this.props;

        const placeholder = list
            ? "Introduzca un título para la lista ..."
            : "Introduzca un título para la tarjeta...";
        
        const buttonTitle = list ? "Añadir Lista" : "Añadir Tarjeta";

        return <div>
            <Card
                style={{
                    minHeight: 85,
                    minWidth: 272,
                    padding: "6px 8px 2px"
                }}
            >
                <TextArea 
                    placeholder={placeholder} 
                    autoFocus 
                    onBlur={this.closeForm}
                    onChange={this.handleInputChange}
                    style={{
                        resize: "none",
                        width: "100%",
                        overflow: "hidden",
                        outline: "none",
                        border: "none"
                    }}
                />
            </Card>
            <div style={styles.formButtonGroup}>
                <Button 
                    onMouseDown={ list ? this.handleAddList : this.handleAddCard}
                    variant="contained"
                    style={{
                        color: "white",
                        backgroundColor: "#5aac44"
                    }} 
                >{buttonTitle}{" "}</Button>
                <Icon style={{marginLeft: 8, cursor: "pointer"}}>close</Icon>
            </div>
        </div>
    };

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }

}

const styles = {

    openFormButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        boderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },

    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItems: "center"
    }
};

export default connect() (TrelloActionButton);