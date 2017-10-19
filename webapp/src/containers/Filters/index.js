import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconFunnel from 'react-icons/lib/fa/filter'

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
  CardSection,
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

import presets from '../../shared/datePresets'


class Filters extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: true,
      selectedDate: '',
      search: '',
      activeFilters: {},
      dates: { start: null, end: null },
    }

    this.handleVisibility = this.handleVisibility.bind(this)
    this.handleDateInputChange = this.handleDateInputChange.bind(this)
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleCleanFilters = this.handleCleanFilters.bind(this)
    this.handleFiltersSubmit = this.handleFiltersSubmit.bind(this)

    this.createTags = this.createTags.bind(this)
    this.cardTitle = this.cardTitle.bind(this)
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
      collapsed: !this.state.collapsed,
    })
  }

  handleDateInputChange (selectedDate) {
    console.log(selectedDate)
    this.setState({
      dates: selectedDate,
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
      collapsed: true,
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

  cardTitle () {
    const activeFiltersKeys = Object.keys(this.state.activeFilters)

    const { collapsed } = this.state

    if (!collapsed) {
      return 'Menos filtros'
    }

    if (collapsed && activeFiltersKeys.length === 0) {
      return 'Mais filtros'
    }

    return 'Editar filtros'
  }

  render () {
    const {
      collapsed,
      activeFilters,
      dates,
    } = this.state

    const activeFiltersKeys = Object.keys(activeFilters)

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
                      dates={dates}
                      active={dates.start || dates.end}
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

              <CardSection
                title={this.cardTitle()}
                collapsedTitle={this.cardTitle()}
                collapsed={collapsed}
                onTitleClick={() => this.setState({ collapsed: !collapsed })}
              >
                <Row className={style.paddingTop}>
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
              </CardSection>

              {collapsed && activeFiltersKeys.length > 0 &&
                <div>
                  <Row>
                    <Col>
                      <p
                        className={style.selectedOptions}
                      >
                        Opções selecionadas
                      </p>
                    </Col>
                  </Row>

                  <Row className={style.marginTop}>
                    <Col className={style.spaceButtons}>
                      {this.createTags()}
                    </Col>
                  </Row>
                </div>
              }
            </Grid>
          </CardContent>

          <CardActions>
            <Grid>
              <Row flex>
                <Col alignEnd className={style.actionsSpacing}>
                  <Button
                    variant="outline"
                    color="silver"
                    size="small"
                    onClick={() => this.handleCleanFilters()}
                    disabled
                    className={style.actionButton}
                  >
                    Limpar filtros
                  </Button>

                  <Button
                    type="submit"
                    color="silver"
                    size="small"
                    disabled
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
