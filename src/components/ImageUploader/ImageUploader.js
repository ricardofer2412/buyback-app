import React from 'react'
import { storage } from '../firebase/Firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';


const classes = {
  button: {
    backgroundColor: '#00e676',
    color: 'white',
    marginTop: 15,
    marginLeft: 5
  },
  buttonDisable: {
    backgroundColor: 'gray',
    color: 'white',
    marginTop: 15,
    marginLeft: 5
  }
}

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      progress: 0,
      isLoading: false, 
      imageGallery: []
    }


  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }))
    }
    console.log(this.state.image)
  }

  disableUpload = () => {
    alert('Please select file')
  }

  handleUpload = () => {

    const { image } = this.state
    const uploadTask = storage.ref(`images/${image.name}`).put(image)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        this.setState({
          isLoading: true,
          progress, 
          imageGallery: []
        })
        console.log(this.state.progress)
      },
      (error) => {
        console.log(error)
      },
      () => {
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
               
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
          style={{ marginLeft: 5 }}
          type='file'
          onChange={this.handleChange} />
        {this.state.image === null
          ?
          <Button
            variant="contained"
            style={classes.buttonDisable}
            startIcon={<CloudUploadIcon />}
            onClick={this.disableUpload}

          >Upload Image</Button>
          :
          <Button
            variant="contained"
            style={classes.button}
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            onClick={this.handleUpload}
          >Upload Image</Button>

        }
      </div>
    )
  }
}

export default ImageUploader  