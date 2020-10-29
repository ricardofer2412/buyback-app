import React from "react";

function imageGallery() {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = (value) => {
    this.props.onClose(value);
  };

  return (
    <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <div>BOX</div>
    </Dialog>
  );
}
export default imageGallery;
