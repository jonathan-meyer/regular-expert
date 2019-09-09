import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Json from "../components/Json";
import Listing from "../components/Listing";

class Group extends Component {
  constructor (props) {
    super (props);
    this.state = {
      group: {},
      listing: [],
      listings: [
        {
          "property_id": "6859368096",
              "listing_id": "2635829945", 
              "prop_type": "single_family",
              "last_update": "2019-09-07T09:05:17Z",
              "rdc_web_url": "https://www.realtor.com/realestateandhomes-detail/142-Darnell-Ave_Spring-Hill_FL_34606_M68593-68096",
              "is_turbo": false,
              "address": "142 Darnell Ave in Spring Hill, Spring Hill, 34606",
              "prop_status": "for_sale",
              "price_raw": 199900,
              "sqft_raw": 1490,
              "list_date": "2019-09-07T14:08:56Z",
              "advertiser_id": 988727,
              "office_name": "RE/MAX MARKETING SPECIALISTS",
              "office_advertiser_id": 958447,
              "products": ["core.agent", "co_broke", "basic_opt_in", "co_broke"],
              "is_showcase": false,
              "price": "$199,900",
              "beds": 3,
              "baths": 2,
              "sqft": "1,490 sq ft",
              "lot_size": "0.34 acres",
              "photo": "https://ap.rdcpix.com/1181323288/b55e7c9c402eb3ce5f91564fd19f5c67l-m0x.jpg",
              "is_cobroker": true,
              "short_price": "$199K",
              "baths_full": 2,
              "photo_count": 20,
              "lat": 28.43504,
              "lon": -82.631372,
              "is_new_listing": true,
              "has_leadform": true,
              "page_no": 1,
              "rank": 1,
              "list_tracking": "type|property|data|prop_id|6859368096|list_id|2635829945|page|rank|list_branding|listing_agent|listing_office|advertiser_id|agent|office|property_status|product_code|advantage_code^1|1|0|1|L6WN|KJJJ|35T|9HU|1^^$0|1|2|$3|4|5|6|7|I|8|J|9|$A|K|B|L]|C|$D|M|E|N]|F|O|G|P|H|Q]]"
            },
        {
          "property_id": "6859368096",
              "listing_id": "2635829945", 
              "prop_type": "single_family",
              "last_update": "2019-09-07T09:05:17Z",
              "rdc_web_url": "https://www.realtor.com/realestateandhomes-detail/142-Darnell-Ave_Spring-Hill_FL_34606_M68593-68096",
              "is_turbo": false,
              "address": "142 Darnell Ave in Spring Hill, Spring Hill, 34606",
              "prop_status": "for_sale",
              "price_raw": 199900,
              "sqft_raw": 1490,
              "list_date": "2019-09-07T14:08:56Z",
              "advertiser_id": 988727,
              "office_name": "RE/MAX MARKETING SPECIALISTS",
              "office_advertiser_id": 958447,
              "products": ["core.agent", "co_broke", "basic_opt_in", "co_broke"],
              "is_showcase": false,
              "price": "$199,900",
              "beds": 3,
              "baths": 2,
              "sqft": "1,490 sq ft",
              "lot_size": "0.34 acres",
              "photo": "https://ap.rdcpix.com/1181323288/b55e7c9c402eb3ce5f91564fd19f5c67l-m0x.jpg",
              "is_cobroker": true,
              "short_price": "$199K",
              "baths_full": 2,
              "photo_count": 20,
              "lat": 28.43504,
              "lon": -82.631372,
              "is_new_listing": true,
              "has_leadform": true,
              "page_no": 1,
              "rank": 1,
              "list_tracking": "type|property|data|prop_id|6859368096|list_id|2635829945|page|rank|list_branding|listing_agent|listing_office|advertiser_id|agent|office|property_status|product_code|advantage_code^1|1|0|1|L6WN|KJJJ|35T|9HU|1^^$0|1|2|$3|4|5|6|7|I|8|J|9|$A|K|B|L]|C|$D|M|E|N]|F|O|G|P|H|Q]]"
        }
      ]
    };
  }
  

  componentDidUpdate() {
    const { group, fetchingGroup, fetchingListing, listing } = this.state;
    const { match, user } = this.props;

    console.log("componentDidUpdate");

    if (user && !fetchingGroup && !group.name && match.params.id) {
      this.setState({ fetchingGroup: true });

      axios
        .get(`/api/group/${match.params.id}`, {
          params: { populate: ["users"] }
        })
        .then(res => res.data)
        .then(data => {
          this.setState({ fetchingGroup: false, group: data });
        })
        .catch(err => {
          this.setState({ fetchingGroup: false, group: {} });
          console.log(err);
        });
    }
    // if (user && !fetchingListing && listing.length === 0 && match.params.id) {
    //   axios
    //     .get(`/api/listing/`, {
    //       params: { group: match.params.id }
    //     })
    //     .then(res => res.data)
    //     .then(data => {
    //       this.setState({ fetchingListing: false, listing: data });
    //     })
    //     .catch(err => {
    //       this.setState({ fetchingListing: false, listing: [] });
    //       console.log(err);
    //     });
    // }
  }
  render() {
    const { group, listing, listings } = this.state;
    return (
      <Card>
        <div>The Chosen Listings</div>
        <ListGroup>
          {this.state.listings.map((listing,key) => (
            <Listing
              key={key}
              photo={listing.photo}
              address={listing.address}
            />
          ))}
        </ListGroup>
        <Json>{group}</Json>
        <Json>{listings}</Json>
      </Card>
    );
  }
}


export default Group;