import React from 'react'
import { storage } from '../firebase/Firebase'

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
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
          this.setState({
            url
          })
        })
      })
  }


  render() {
    return (
      <div>
        <progress value={this.state.progress} max="100" />
        <input
          type='file'
          onChange={this.handleChange} />
        <button onClick={this.handleUpload}>Upload</button>
        <img src={this.state.url} alt="Uploaded Images" height="200" width="200" />
      </div>
    )
  }
}

export default ImageUploader  