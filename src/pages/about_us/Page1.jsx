import React, { Component } from 'react';
import { Grid, Segment, Header,Image, GridRow, GridColumn,Icon, Transition, Visibility } from 'semantic-ui-react';
import AboutUsCard from '../../components/about_us/AboutUsCard';
import InfoCard from '../../components/about_us/InfoCard';

export default class Page1 extends Component {
  render() {
    return(
        <div className='firstAboutPage'>
           
            <Grid centered stackable>
                <GridRow>
                {/* <Header as='h1' size='huge' inverted textAlign='left'>
                <Icon name='hand spock' />
                <Header.Content>
                About Us
                <Header.Subheader>What our team stands for</Header.Subheader>
                </Header.Content>
            </Header> */}
                </GridRow>
                <GridRow centered>
                    <InfoCard></InfoCard>
                </GridRow>
            </Grid>
        </div>
    );
    }
}