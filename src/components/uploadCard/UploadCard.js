import React, { useState } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  Button,
  Progress,
} from "reactstrap";

function UploadCard({ data }) {
  const [checkOpen, setCheckOpen] = useState(false);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="d-flex justify-content-between">
          <span>{data.title}</span>
          <span className="text-muted h6">{`${new Date(
            data.date
          ).toDateString()}`}</span>
          <span className="text-muted h6">
            Completeness percentage: {data.status}%
          </span>
        </CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {data.name} | {data.username}
        </CardSubtitle>
      </CardBody>
      <CardBody>
        <CardText>{data.description}</CardText>
      </CardBody>
      <CardFooter>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <Button onClick={() => setCheckOpen(!checkOpen)}>Check</Button>
          {/* <span className="bg-blue">Similarity percentage: 75%</span> */}
        </div>
        {checkOpen ? (
          <>
            <Progress striped color="success" value="75" />
            <div className="mt-4">
              <Button style={{ marginRight: "20px" }}>Approve</Button>
              <Button>Decline</Button>
            </div>
          </>
        ) : null}
      </CardFooter>
    </Card>
  );
}

export default UploadCard;
