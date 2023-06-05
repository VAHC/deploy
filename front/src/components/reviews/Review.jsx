import React from 'react';


const Review = (props) => {

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          const starIcon = i <= rating ? <i key={i} className="bi bi-star-fill" /> : <i key={i} className="bi bi-star"/>;
          stars.push(starIcon);
        }
        return stars;
      };

    return (
        <div className="container-lg border border-2 rounded p-3 mb-3">
        <div className="d-flex justify-content-between">
          <h5>{props.title}</h5>
          <div>{renderStars(props.qualification)}</div>
        </div>
        <div className="comment-container border rounded mt-3 p-2 mx-auto" style={{ overflowY: 'scroll', maxHeight: '150px', width: '90%' }}>
        <p>{props.comment}</p>
      </div>
        <h6 className="text-end">{props.userFirstName}</h6>
      </div>
    )
};

export default Review