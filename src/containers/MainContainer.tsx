import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEntities } from "../redux/actions";
import { getEntitesData } from "../redux/selectors";
import  {  Stack, Container, Paper, Input, TextareaAutosize, Typography, TextField  }  from "@mui/material";
import { Entities } from '../redux/types';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import '../assets/styles.css';

const Item = styled(Paper)(() => ({
    backgroundColor: "#1A2027",
    textAlign: 'center',
    color: '#fff',
    padding: "10px 40px"
}));

const StyledStack = styled(Stack)(() => ({
    backgroundColor: '#ccc',
    padding: "15px"
}));

const StyledContainer = styled(Container)(() => ({
    backgroundColor: '#fff',
    padding: '20px'
}));

const DataRow = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#d1d1d1",
    boxShadow: "none",
    paddingLeft: "20px"
}));

const DataWrapper = styled(Paper)(() => ({
    border: "1px solid #1A2027",
    backgroundColor: "#d1d1d1",
    padding: "10px 0"
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

const StyledTextField = styled(TextField)(() => ({
    width: "90%",
}));



export const MainContainer: React.FC = () => {
    const dispatch = useDispatch();

    const [entites, setEntitesData] = useState<Entities>([]);

    const entitesState = useSelector(getEntitesData);



    useEffect(() => {
        dispatch(setEntities());
    },[])

    useEffect(() => {
        setEntitesData(entitesState);
    },[entitesState, entites])

    return (<>
        <Container maxWidth="sm">
             <h1>JSON Parser</h1>
            <StyledContainer>
                {entites.length > 0 && entites.map((item) => {
                    return (
                        <StyledStack key={item.id}>
                            <Item>
                                <DataWrapper>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
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
                                            <FormControlLabel value="female" control={<Radio />} label="True" />
                                            <FormControlLabel value="male" control={<Radio />} label="False" />
                                        </RadioGroup>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Picture :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {item.picture}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <Input type={"text"} placeholder={"Type picture link here"}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Age :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {item.age}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <Input type={"number"}  placeholder={"Type age here"}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Name :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {item.name}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <Input type={"text"}  placeholder={"Type name here"}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            E-mail :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {item.email}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <Input type={"email"}  placeholder={"Type e-mail here"}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            Address :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {item.address}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <StyledTextField multiline={true} placeholder={"Type address here"}/>
                                    </StyledFormControl>
                                </DataWrapper>
                                <DataWrapper>
                                    <DataRow>
                                        <StyledRowHeadlineKey  variant="body1">
                                            About :
                                        </StyledRowHeadlineKey >
                                        <StyledRowHeadlineValue variant="body1" mb={2}>
                                            {item.about}
                                        </StyledRowHeadlineValue>
                                    </DataRow>
                                    <StyledFormControl>
                                        <StyledTextField
                                            multiline={true}
                                            minRows={5}
                                            placeholder={"Type info here"}/>
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
