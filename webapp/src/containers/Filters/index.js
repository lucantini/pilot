import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconFunnel from 'react-icons/lib/fa/filter'
import IconArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import IconArrowUp from 'react-icons/lib/md/keyboard-arrow-up'

import {
  __,
  contains,
  merge,
  partial,
  keys,
  flatten,
  props as rProps,
  prop,
  pipe,
  propEq,
  mapObjIndexed,
  filter as rFilter,
  find,
  map,
  propSatisfies,
} from 'ramda'

import style from './style.css'

import {
  Card,
  CardTitle,
  CardContent,
  CardActions,
} from '../../components/Card'

import DateInput from '../../components/Toolbar/DateInput'
import SearchField from '../../components/Toolbar/SearchField'
import Toolbar from '../../components/Toolbar'
import Button from '../../components/Button'
import Tag from '../../components/Tag'

import {
  Grid,
  Row,
  Col,
} from '../../components/Grid'

import CheckboxGroup from '../../components/CheckboxGroup'

import presets from '../../shared/date-presets'


class Filters extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showContent: true,
      selectedDate: '',
      search: '',
      activeFilters: {},
    }

    this.handleVisibility = this.handleVisibility.bind(this)
    this.handleDateInputChange = this.handleDateInputChange.bind(this)
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleCleanFilters = this.handleCleanFilters.bind(this)
    this.handleFiltersSubmit = this.handleFiltersSubmit.bind(this)

    this.createTags = this.createTags.bind(this)
  }

  componentDidMount () {
    this.setDefaults()
  }

  setDefaults () {
    this.setState({
      selectedDate: '',
    })
  }

  handleVisibility () {
    this.setState({
      showContent: !this.state.showContent,
    })
  }

  handleDateInputChange (selectedDate) {
    this.setState({
      selectedDate,
      submitted: false,
    })
  }

  handleSearchFieldChange (search) {
    this.setState({
      search,
      submitted: false,
    })
  }

  handleFilterChange (filter, values) {
    this.setState({
      activeFilters: merge(
        this.state.activeFilters,
        { [filter]: values }
      ),
      submitted: false,
    })
  }

  handleCleanFilters () {
    this.setState({
      activeFilters: {},
      selectedDate: 'hoje',
      search: '',
      submitted: false,
    })

    this.setDefaults()
  }

  handleFiltersSubmit (event) {
    event.preventDefault()

    const {
      activeFilters,
      selectedDate,
      search,
    } = this.state

    const selectedFilters = merge(
      activeFilters,
      {
        selectedDate,
        search,
      }
    )

    this.setState({
      submitted: true,
      showContent: true,
    })

    this.props.onFilter(selectedFilters)
  }

  createTags () {
    const activeFiltersObj = mapObjIndexed((values, key) =>
      pipe(
        find(propEq('key', key)),
        prop('items'),
        rFilter(propSatisfies(contains(__, values), 'value'))
      )(this.props.sections)
    )

    const withLabel = activeFiltersObj(this.state.activeFilters)
    const selectedFilters = pipe(
      rProps(keys(withLabel)),
      flatten
    )(withLabel)

    return map(({ label, value }) => (
      <Tag
        key={value}
        text={label}
      />
    ), selectedFilters)
  }

  render () {
    const {
      showContent,
    } = this.state

    return (
      <Card className={style.allowContentOverflow}>
        <form action="/" method="post" onSubmit={this.handleFiltersSubmit}>
          <CardTitle
            title="Filtros"
            icon={<IconFunnel />}
          />

          <CardContent>
            <Grid>
              <Row flex className={style.customRow}>
                <Col>
                  <Toolbar>
                    <DateInput
                      onChange={this.handleDateInputChange}
                      presets={presets}
                    />

                    <SearchField
                      value={this.state.search}
                      placeholder="Filtre por ID, CPF, nome e e-mail."
                      onChange={this.handleSearchFieldChange}
                      active={!!this.state.search}
                    />
                  </Toolbar>
                </Col>
              </Row>

              <div className={style.collapse}>
                <Button
                  className={style.collapseButton}
                  variant="clean"
                  onClick={this.handleVisibility}
                >
                  Meh {showContent ? <IconArrowDown /> : <IconArrowUp />}
                </Button>

                <Row toggleChildren={showContent} className={style.paddingTop}>
                  {this.props.sections.map(({ name, items, key }) => (
                    <Col palm={12} tablet={6} desk={4} tv={4} key={name}>
                      <h4 className={style.heading}>{name}</h4>
                      <Row>
                        <CheckboxGroup
                          columns={2}
                          className={style.checkboxGroup}
                          options={items}
                          name={name}
                          onChange={partial(this.handleFilterChange, [key])}
                          values={this.state.activeFilters[key] || []}
                        />
                      </Row>
                    </Col>
                  ))}
                </Row>
              </div>

              {this.state.showContent && this.createTags() &&
                <Row className={style.paddingTop}>
                  <Col className={style.spaceButtons}>
                    {this.createTags()}
                  </Col>
                </Row>
              }
            </Grid>
          </CardContent>

          <CardActions>
            <Grid>
              <Row flex>
                <Col alignEnd className={style.actionsSpacing}>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => this.handleCleanFilters()}
                    className={style.actionButton}
                  >
                    Limpar filtros
                  </Button>

                  <Button
                    type="submit"
                    size="small"
                    className={style.actionButton}
                  >
                    {
                      this.state.submitted
                        ? 'Filtrar'
                        : 'Aplicar filtros'
                    }
                  </Button>
                </Col>
              </Row>
            </Grid>
          </CardActions>
        </form>
      </Card>
    )
  }
}

Filters.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
  })).isRequired,
  onFilter: PropTypes.func.isRequired,
}

export default Filters
