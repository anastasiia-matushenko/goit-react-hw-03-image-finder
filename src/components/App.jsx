import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchApi } from 'services/fetchApi';
import { Container } from './App.styled';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Notification } from './Notification/Notification';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    page: 1,
    maxPage: 41,
    query: '',
    images: [],
    isLoading: false,
    data: null,
    isOpenModal: false,
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.fetchImages();
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const value = evt.currentTarget.elements.search.value;
    this.setState({
      page: 1,
      query: value,
      images: [],
    });
    evt.target.reset();
  };

  fetchImages = () => {
    const { page, query } = this.state;
    this.setState({ isLoading: true });
    fetchApi(page, query)
      .then(resp =>
        this.setState(prevState => ({
          images: [...prevState.images, ...resp],
        }))
      )
      .catch(err => {
        this.setState({ error: err.message });
        toast.error(`${err.message}`, { position: 'top-center' });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onModalOpen = data => {
    this.setState({
      isOpenModal: true,
      data,
    });
  };

  onModalClose = () => {
    this.setState({
      isOpenModal: false,
      data: null,
    });
  };

  render() {
    const { images, isLoading, data, isOpenModal, error, page, maxPage } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <ToastContainer />}
        {images.length > 0 && (
          <ImageGallery images={images} onOpen={this.onModalOpen} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && page < maxPage && (
          <Button handleClick={this.loadMore} />
        )}
        {page === maxPage && (
          <Notification message="Sorry, that's the last page" />
        )}
        {isOpenModal && <Modal url={data} onClose={this.onModalClose} />}
      </Container>
    );
  }
}
