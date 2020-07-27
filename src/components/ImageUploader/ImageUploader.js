import React from 'react'
import { storage } from '../firebase/Firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';


const classes = {
  button: {

  }
}

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      progress: 0,
      isLoading: false
    }


  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }))
    }
    console.log(this.state.image)
  }

  handleUpload = () => {
    const { image } = this.state
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        this.setState({
          isLoading: true,
          progress
        })
        console.log(this.state.progress)
      },
      (error) => {
        console.log(error)
      },
      () => {
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          console.log(url);
          this.props.handleUrlChange(url)
          this.setState({
            isLoading: false
          })
        })
      })
  }


  render() {
    return (
      <div>

        {this.state.isLoading == true ?
          <CircularProgress color="secondary" value={this.state.progress} max="100" variant="indeterminate" />
          // <progress value={this.state.progress} max="100" />
          :
          <br />
        }
        <input
          type='file'
          onChange={this.handleChange} />
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
          onClick={this.handleUpload}
        >Upload Image</Button>
        {/* <button onClick={this.handleUpload}>Upload</button> */}

      </div>
    )
  }
}

export default ImageUploader  