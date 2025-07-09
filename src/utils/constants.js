export const AsyncStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAIL: 'fail',
  SUBMITTING: 'submitting'
};

export const modules = {
  toolbar: {
    container: [['image'], [{ header: [1, 2, 3, 4, 5, false] }], ['bold', 'underline']]
  }
};

export const convertToInt=(param, result)=>{
  const num = parseInt(param, 10);
  return (num >= 1) ? num : result;
};

export const ratingMessage = ["아쉬워요!", "그저 그래요!", "보통이에요!" , "좋아요!",  "아주 좋아요!"];