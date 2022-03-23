import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEntities, loadEntitiesLength } from "../redux/actions";
import { getEntitesData, getEntitesLength } from "../redux/selectors";
import  {  Stack, Container, Paper, Input, Typography, TextField, Box  }  from "@mui/material";
import { Entities, Entity } from '../redux/types';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { getKeyByValue } from "../utils/utils";
// import '../assets/styles.css';

const Item = styled(Paper)(() => ({
    backgroundColor: "#1A2027",
    textAlign: 'center',
    color: '#fff',
    padding: "10px 40px"
}));

const StyledStack = styled(Stack)(() => ({
    backgroundColor: '#ccc',
    padding: "15px",
    marginBottom: '20px',
}));

const StyledContainer = styled(Box)(() => ({
    backgroundColor: '#fff',
    padding: '20px',
    height: '1250px',
    overflowY: 'scroll'
}));



const DataRow = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#d1d1d1",
    boxShadow: "none",
    paddingLeft: "20px",
}));


const KeyValueDataRow = styled(DataRow)(() => ({
    height: "40px",
}));

const DataWrapper = styled(Paper)(() => ({
    border: "1px solid #1A2027",
    backgroundColor: "#d1d1d1",
    padding: "10px 0"
}));

const DataHeader = styled(Paper)(() => ({
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
}));

const StyledFormControl = styled(FormControl)(() => ({
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "20px"
}));

const StyledRowHeadlineKey = styled(Typography)(() => ({
    paddingRight: "5px",
    width: "25%",
    textAlign: "left"
}));

const StyledRowHeadlineValue = styled(Typography)(() => ({
    textAlign: "left",
    width: "75%",
    paddingRight: "20px"
}));

const SubHeadline = styled(Typography)(() => ({
    color: "#ff4e33",
    paddingTop: "10px"
}));

const StyledTextField = styled(TextField)(() => ({
    width: "90%",
}));



export const MainContainer: React.FC = () => {
    const [elem, setElem] = useState<number>(1);
    const [prevElem, setPrevElem] = useState<number>(0);
    const [entites, setEntitesData] = useState<Entities>([]);
    const [pictureInputValue, setPictureInputValue] = useState<string>("");
    const [ageInputValue, setAgeInputValue] = useState<number>(0);
    const [nameInputValue, setNameInputValue] = useState<string>("");
    const [emailInputValue, setEmailInputValue] = useState<string>("");
    const [addressInputValue, setAddressInputValue] = useState<string>("");
    const [aboutInputValue, setAboutInputValue] = useState<string>("");
    const [savedPosition, setSavedPosition] = useState<number>(0);

    const dispatch = useDispatch();



    const entitesState = useSelector(getEntitesData);
    const entitesLength = useSelector(getEntitesLength);
    const scroller = React.createRef();



    useEffect(() => {
        dispatch(loadEntitiesLength());
        dispatch(setEntities());
    },[])

    useEffect(() => {
        setEntitesData(entitesState);
        entitesState.forEach((item) => {
            if (!item.disabled) {
                setPictureInputValue(item.picture);
                setAgeInputValue(item.age);
                setNameInputValue(item.name);
                setEmailInputValue(item.email);
                setAddressInputValue(item.address);
                setAboutInputValue(item.about);
            }
        })
    },[entitesState])


    useEffect(() => {
        dispatch(setEntities(elem));
    },[elem])


    const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const scrollContainer: React.RefObject<any> = scroller;
        let realPosition = event.currentTarget.scrollTop;

        setSavedPosition(realPosition);

        setPrevElem(elem);

        if(savedPosition > realPosition  && realPosition ===0 && elem > 0) {

            if (elem !== 1) {
                setElem(elem - 1);
            }
            if (prevElem === 2) {
                scrollContainer.current.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })

            } else {
                scrollContainer.current.scrollTo({
                    top: 1150,
                    behavior: 'smooth'
                })
            }


        }

        if(realPosition > 1170 && elem !== entitesLength) {
            setElem(elem + 1);
            scrollContainer.current.scrollTo({
                top: 800,
                behavior: 'smooth'
            });
            setSavedPosition(0);
        }


    }


    const handlePictureInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>):void  => {
        setPictureInputValue(event.target.value);
    }


    const handleAgeInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>):void  => {
        setAgeInputValue(Number(event.target.value));
    }

    const handleNameInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>):void  => {
        setNameInputValue(event.target.value);
    }

    const handleEmailInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>):void  => {
        setEmailInputValue(event.target.value);
    }

    const handleAddressInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>):void  => {
        setAddressInputValue(event.target.value);
    }

    const handleAboutInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>):void  => {
        setAboutInputValue(event.target.value);
    }

    return (<>
        <Container maxWidth="sm">
            <DataHeader sx={{ backgroundColor: "#000"}}>
                <SubHeadline variant={'body1'}>Total qty : {entitesLength}</SubHeadline>
                <Typography variant={'h4'}>JSON Parser</Typography>
                <SubHeadline variant={'body1'}>Current element : {elem}</SubHeadline>
            </DataHeader>
            <StyledContainer  onScroll={onScroll} ref={scroller} >
                {entites.length > 0 && entites.map((item, index) => {
                    return (
                        <StyledStack key={item.id} >
                            <Item >
                                <DataWrapper sx={{ height: '70px'}}>
                                    <DataRow >
                                        <StyledRowHeadlineKey  variant="body1" >
                                            Active :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {item.isActive.toString()}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="female" control={<Radio disabled={item.disabled}/>} label="True" />
                                            <FormControlLabel value="male" control={<Radio  disabled={item.disabled}/>} label="False" />
                                        </RadioGroup>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '70px'}}>
                                    <KeyValueDataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Picture :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {!item.disabled? pictureInputValue : item.picture}
                                        </StyledRowHeadlineValue>
                                    </KeyValueDataRow >
                                    <StyledFormControl>
                                        <Input  onChange={handlePictureInputChange} type={"text"} placeholder={"Type picture link here"} disabled={item.disabled}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '70px'}}>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Age :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {!item.disabled? ageInputValue : item.age}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <Input onChange={handleAgeInputChange} type={"number"}  placeholder={"Type age here"} disabled={item.disabled}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '70px'}}>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Name :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {!item.disabled? nameInputValue : item.name}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <Input onChange={handleNameInputChange} type={"text"}  placeholder={"Type name here"} disabled={item.disabled}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '70px'}}>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            E-mail :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {!item.disabled? emailInputValue : item.email}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <Input onChange={handleEmailInputChange} type={"email"}  placeholder={"Type e-mail here"} disabled={item.disabled}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '200px'}}>
                                    <DataRow sx={{ height: '80px', overflowY: 'auto', margin: '20px 10px'}}>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Address :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {!item.disabled? addressInputValue : item.address}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <StyledTextField onChange={handleAddressInputChange} multiline={true}  minRows={2} placeholder={"Type address here"} disabled={item.disabled}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '450px', }}>
                                    <DataRow sx={{ height: '250px', overflowY: 'auto', margin: '20px 10px'}}>
                                        <StyledRowHeadlineKey  variant="body1">
                                            About :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {!item.disabled? aboutInputValue : item.about}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <StyledTextField
                                            multiline={true}
                                            onChange={handleAboutInputChange}
                                            minRows={5}
                                            placeholder={"Type info here"}
                                            disabled={item.disabled}
                                        />
                                    </StyledFormControl>
                                </DataWrapper>
                            </Item>
                        </StyledStack>
                    );
                })}
            </StyledContainer>
        </Container>
    </>);
}
