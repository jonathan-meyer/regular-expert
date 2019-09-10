import React from "react";
import { Link } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

class ListingFull extends React.Component {
  render() {
    const { user, listing } = this.props;

    return (
      <div>
        {listing && (
          <div>
            {[
              <Image src={listing.mls.photo.href} thumbnail />,
              <p>{listing.mls.description}</p>,
              `Address: ${listing.mls.client_display_text.address_with_neighborhood}`,
              `Price: $${listing.mls.price}`,
              `Beds: ${listing.mls.beds}`,
              `Baths: ${listing.mls.baths}`,
              user ? (
                <Button as={Link} to={`/share/${listing._id}`}>
                  Share &amp; Collaborate
                </Button>
              ) : (
                <Button as={Link} to="/login">
                  Login to Share
                </Button>
              ),
              <Button
                variant="outline-primary"
                href={listing.mls.web_url}
                target="_blank"
              >
                See more @ Realtor.com
              </Button>
            ].map((item, key) => (
              <div key={key} className="mb-1">
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ListingFull;
