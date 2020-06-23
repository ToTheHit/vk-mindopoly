import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import './homework.css';
import Icon56InboxOutline from '@vkontakte/icons/dist/56/inbox_outline';
import Icon28CheckSquareOutline from '@vkontakte/icons/dist/28/check_square_outline';
import Icon28DeleteOutline from '@vkontakte/icons/dist/28/delete_outline';
import {
  Button, Card, classNames, Div, Panel, PanelHeader, Placeholder, Subhead, Text, Title,
} from '@vkontakte/vkui';
import Collapse from '@kunukn/react-collapse';

const Homework = (props) => {
  const { id } = props;
  const [tasks, setTasks] = useState([
    {
      question: 'Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?',
      answer: 'Н. В. Гоголь',
      explanation: 'Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день.',
    },
    {
      question: '1Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?',
      answer: 'Н. В. Гоголь',
      explanation: 'Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день.',
    },
    {
      question: '2Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?',
      answer: 'Н. В. Гоголь',
      explanation: 'Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день.',
    },
    {
      question: '3Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?',
      answer: 'Н. В. Гоголь',
      explanation: 'Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день.',
    },
    {
      question: '4Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?',
      answer: 'Н. В. Гоголь',
      explanation: 'Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день.',
    },
    {
      question: '5Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?',
      answer: 'Н. В. Гоголь',
      explanation: 'Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день.',
    },
    {
      question: '6Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?',
      answer: 'Н. В. Гоголь',
      explanation: 'Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день.',
    },
    {
      question: '7Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?',
      answer: 'Н. В. Гоголь',
      explanation: 'Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день.',
    },
    {
      question: '8Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?',
      answer: 'Н. В. Гоголь',
      explanation: 'Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день. Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день.',
    },
    {
      question: '9Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?',
      answer: 'Н. В. Гоголь',
      explanation: 'Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день.',
    },
    {
      question: '10Кто из нижеперечисленных авторов написал произведение «Мёртвые души»?',
      answer: 'Н. В. Гоголь',
      explanation: 'Гоголь написал Мертвые Души в 1986 году. Произведение набрало невероятную популярность и считается актуальным по сей день.',
    },
  ]);
  const [renderedTasks, setRenderedTasks] = useState([]);

  useEffect(() => {
    window.scroll({ top: document.body.offsetHeight, left: 0, behavior: 'smooth' });
  }, [renderedTasks.length]);

  function confirmAllTasks() {
    setTasks([]);
  }

  useEffect(() => {
    const rendered = tasks.map((task, index) => (
      <Div
        className="Homework__card"
        key={`HomeworkCard__${task.question}`}
        style={{ paddingTop: '10px', paddingBottom: 0 }}
      >
        <Card>
          <Div>
            <Subhead
              weight="regular"
              className={classNames('Homework__preview', { 'Homework__preview--hidden': index === (tasks.length - 1) })}
            >
              {task.question}
            </Subhead>
            <div className={classNames('Homework__card--content', { 'Homework__card--content-hidden': index !== (tasks.length - 1) })}>
              <Title level="2" weight="semibold" className="Homework__question">
                {task.question}
              </Title>
              <Text weight="regular" className="Homework__answer">
                {task.answer}
              </Text>
              <Subhead weight="regular" className="Homework__explanation">
                {task.explanation}
              </Subhead>
              <Button
                className="Homework__button"
                mode="secondary"
                before={<Icon28CheckSquareOutline height={28} width={28} />}
                size="xl"
                onClick={() => {
                  setTasks(tasks.slice(0, tasks.length - 1));
                }}
              >
                Выучено
              </Button>
            </div>
          </Div>

        </Card>
      </Div>
    ));
    setRenderedTasks(rendered);
  }, [tasks.length]);

  return (
    <Panel className="Homework" id={id}>
      <PanelHeader>
        Домашка
      </PanelHeader>

      {(renderedTasks.length > 0
        ? (
          <div className="Homework__list">
            <Button
              mode="tertiary"
              size="xl"
              before={<Icon28DeleteOutline width={24} height={24} />}
              style={{ marginTop: '10px' }}
              onClick={() => confirmAllTasks()}
            >
              Очистить список
            </Button>
            {renderedTasks}
          </div>
        )
        : (
          <Placeholder
            icon={(
              <Icon56InboxOutline
                width={56}
                height={56}
                style={{ color: 'var(--button_primary_background)' }}
              />
            )}
          >
            В этом разделе записываются вопросы, в которых Вы допустили ошибки.
          </Placeholder>
        )
        )}

    </Panel>
  );
};

Homework.propTypes = {
  id: PropTypes.string.isRequired,
};
Homework.defaultProps = {};
export default Homework;
