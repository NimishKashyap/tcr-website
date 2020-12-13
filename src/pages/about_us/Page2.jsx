import React, { Component } from 'react';
import { Grid, Segment, Header,Image,Menu,Input, Label, Icon, Button } from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';
import AboutUsCard from '../../components/about_us/AboutUsCard';
import {db} from '../../services/google-firebase/setup';
import Member from '../../services/google-firebase/models/members/member'
import Role from '../../services/google-firebase/models/members/role'


var time = new Date();
export default class Page2 extends Component {
    state = { 
        activeItem: 
            (time.getMonth() > 2)? 
            (time.getFullYear()+1).toString(): 
            time.getFullYear().toString(), 
        data:[], yearHeaders: [] 
    };
    
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name }, () => this.getSelectedTeam());
    }

    async getMemberData(){
        db.collection(Member.collectionName).get()
        .then((documents) => {
            this.documents = documents;
            this.getSelectedTeam();
        });
        // console.log('getMemberData');
    }

    getSelectedTeam() {
        let tempArray = [];
        // console.log('getSelectedTeam '+this.state.activeItem);
        this.documents.forEach((doc)=>{
            let details = doc.data();
            let selectedTeam = parseInt(this.state.activeItem);
            let roleForSelectedTeamYear = doc.data().roles[selectedTeam] ?? Role.ALUMNI;
            details['currentRole'] = roleForSelectedTeamYear;
            if(
                roleForSelectedTeamYear !== Role.ALUMNI && 
                (
                    roleForSelectedTeamYear === Role.CAPTAIN || 
                    roleForSelectedTeamYear === Role.LEAD
                )
            ){
                tempArray.push(details);
            }
        });
        this.setState({data: tempArray});
    }
    componentDidMount(){
        this.getMemberData();
        let currentYear = (time.getMonth() > 2)? time.getFullYear()+1: time.getFullYear();
        let tempyearHeaders = [currentYear];
        // console.log(currentYear)
        for(let i = currentYear ;i>2013;i--){
            tempyearHeaders.push(i);
        }
        tempyearHeaders = [...new Set(tempyearHeaders)];
        this.setState({yearHeaders:tempyearHeaders});
    }
  render() {
    const { activeItem } = this.state;
    return(
        <div className='secondAboutPage'>
            <Header textAlign='center' inverted size='huge'>The Team Leads</Header>
            <Menu attached='top' tabular inverted pointing secondary className='blogMenuTop' size='huge' fluid>
            {
                this.state.yearHeaders.map((year)=>{  
                        return(<Menu.Item inverted="true"
                        name={year.toString()}
                        key={year.toString()}
                        active={activeItem.toString() === year.toString()}
                        onClick={this.handleItemClick}
                    />)
                })
            }
            </Menu>
            <Grid centered doubling stackable>
                <Grid.Row columns={6}>
                {
                this.state.data.map((member)=>(
                    <Grid.Column key={member.username} computer= {4} className='justToAlignMemberCards'>
                    <AboutUsCard data={member}></AboutUsCard>
                    </Grid.Column>
                ))
                }
                </Grid.Row>
                                  
                <Grid.Row>
                <div>
                    <Link to="/Gallery">
                    <Button fluid positive>View Complete Team</Button>
                    </Link>
                </div>
                </Grid.Row>
            </Grid>
        </div>
    );
    }
}