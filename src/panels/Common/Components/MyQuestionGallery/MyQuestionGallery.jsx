import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Div, Gallery, SimpleCell } from '@vkontakte/vkui';
import './myQuestionGallery.css';

const MyQuestionGallery = (props) => {
  const { questions } = props;
  const [renderedQuestions, setRenderedQuestions] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const render = questions.map((item) => (
      <div
        key={Math.random()}
        className={'MyQuestionGallery--cardOuter'}
      >
        <Card mode="outline"
        >
          <SimpleCell
            multiline
            description={`Доход ${item.cost} BR`}
          >
            {item.question}
          </SimpleCell>
        </Card>
      </div>
    ));
    setRenderedQuestions(render);
  }, [questions]);

  return (
    <div>
      {(renderedQuestions.length ?
          <Gallery
            className="MyQuestionGallery"
            slideWidth={'custom'}
            slideIndex={slideIndex}
            onChange={(i) => setSlideIndex(i)}
            style={{ paddingLeft: '12px'}}
          >
            {renderedQuestions}
          </Gallery>
          :
          <div className={"MyQuestionGallery--empty"}>
            <div className="MyQuestionGallery--empty__content">
              Купите вопросы в магазине и получайте BR за ошибки других игроков.
            </div>
          </div>
        )}

    </div>


  );
};

MyQuestionGallery.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
    cost: PropTypes.number,
  })).isRequired,
};
MyQuestionGallery.defaultProps = {};
export default MyQuestionGallery;
