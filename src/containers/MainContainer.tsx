import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEntities, loadEntitiesLength } from "../redux/actions";
import { getEntitesData, getEntitesLength } from "../redux/selectors";
import  {  Stack, Container, Paper, Input, Typography, TextField, Box  }  from "@mui/material";
import { Entities } from '../redux/types';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

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
    padding: '20px 10px',
    height: '1360px',
    overflowY: 'scroll'
}));



const DataRow = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#d1d1d1",
    boxShadow: "none",
    paddingLeft: "20px",
    height: "20px"
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
    height: "50px"
}));

const StyledFormControl = styled(FormControl)(() => ({
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "20px",
    paddingTop: "10px"
}));

const StyledRowHeadlineKey = styled(Typography)(() => ({
    paddingRight: "5px",
    width: "22%",
    textAlign: "left",
    lineHeight: 1
}));

const StyledRowHeadlineValue = styled(Typography)(() => ({
    textAlign: "left",
    width: "75%",
    paddingRight: "20px",
    lineHeight: 1
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
    const [activeRadioValue, setActiveRadioValue] = useState<string>('false');
    const [pictureInputValue, setPictureInputValue] = useState<string>("");
    const [ageInputValue, setAgeInputValue] = useState<number>(0);
    const [nameInputValue, setNameInputValue] = useState<string>("");
    const [emailInputValue, setEmailInputValue] = useState<string>("");
    const [addressInputValue, setAddressInputValue] = useState<string>("");
    const [aboutInputValue, setAboutInputValue] = useState<string>("");
    const [dateRegisteredInputValue, setDateRegisteredInputValue] = useState<any | Date | number | string>(null);
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
                setActiveRadioValue(item.isActive.toString());
                setPictureInputValue(item.picture);
                setAgeInputValue(item.age);
                setNameInputValue(item.name);
                setEmailInputValue(item.email);
                setAddressInputValue(item.address);
                setAboutInputValue(item.about);
                setDateRegisteredInputValue(new Date(item.registered?item.registered.split("T")[0]:""));
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
                    top: 660,
                    behavior: 'smooth'
                })
            }


        }

        if(realPosition > 675 && elem !== entitesLength) {
            setElem(elem + 1);
            scrollContainer.current.scrollTo({
                top: 650,
                behavior: 'smooth'
            });
            setSavedPosition(0);
        }


    }

    const handleActiveRadioChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>):void  => {
        console.log(event.target.value);
        setActiveRadioValue(event.target.value);
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
                                <DataWrapper sx={{ height: '55px'}}>
                                    <DataRow >
                                        <StyledRowHeadlineKey  variant="body1" >
                                            Active :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1">
                                            {!item.disabled? activeRadioValue: String(item.isActive)}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <RadioGroup
                                            row
                                            sx={{ height: '20px'}}
                                            value={activeRadioValue}
                                            onChange={handleActiveRadioChange}
                                        >
                                            <FormControlLabel value="true" control={<Radio disabled={item.disabled}/>} label="True" />
                                            <FormControlLabel value="false" control={<Radio  disabled={item.disabled}/>} label="False" />
                                        </RadioGroup>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '55px'}}>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Picture :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {!item.disabled? pictureInputValue : item.picture}
                                        </StyledRowHeadlineValue>
                                    </DataRow >
                                    <StyledFormControl>
                                        <Input   onChange={handlePictureInputChange} type={"text"} placeholder={"Type picture link here"} disabled={item.disabled}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '55px'}}>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Age :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {!item.disabled? ageInputValue : item.age}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <Input  onChange={handleAgeInputChange} type={"number"}  placeholder={"Type age here"} disabled={item.disabled}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '55px'}}>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Name :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {!item.disabled? nameInputValue : item.name}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <Input  onChange={handleNameInputChange} type={"text"}  placeholder={"Type name here"} disabled={item.disabled}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '55px'}}>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            E-mail :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {!item.disabled? emailInputValue : item.email}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <Input  onChange={handleEmailInputChange} type={"email"}  placeholder={"Type e-mail here"} disabled={item.disabled}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '150px'}}>
                                    <DataRow sx={{ height: '50px', overflowY: 'auto', marginTop: '5px'}}>
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
                                <DataWrapper >
                                    <DataRow sx={{ height: '130px', overflowY: 'auto', paddingBottom: "5px"}}>
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
                                            minRows={3}
                                            placeholder={"Type info here"}
                                            disabled={item.disabled}
                                        />
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper sx={{ height: '100px'}}>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Date :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                        {
                                            !item.disabled?
                                            Intl.DateTimeFormat("en").format(dateRegisteredInputValue) :
                                            Intl.DateTimeFormat("en").format(new Date(item.registered?item.registered.split("T")[0]:""))
                                        }
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                value={dateRegisteredInputValue}
                                                onChange={(newValue) => {
                                                    setDateRegisteredInputValue(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                                disabled={item.disabled}
                                            />
                                        </LocalizationProvider>
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
