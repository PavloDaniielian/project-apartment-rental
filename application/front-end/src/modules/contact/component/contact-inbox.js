import React from 'react';
import PropTypes from 'prop-types';
import { 
  Grid,Paper,withStyles,
  Checkbox,
  Table,TableBody,TableCell,TableRow,TablePagination

}from '@material-ui/core';

import styles from '../styles/contact-inbox';
import InboxToolBar from './inbox-toolbar';
import InboxTableHead from './inbox-table-head';


let counter = 0;
function createData(name, date, messageTitle, listingTitle) {
  counter += 1;
  return { id: counter, name, date, messageTitle, listingTitle };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class ContactInbox extends React.Component{

  
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc'){
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  state = {
    order: 'asc',
    orderBy: 'date',
    selected: [],
    data: [
      createData('a', '05/02/2019',' hello ','listing'),
      createData('b', '05/02/2019',' hello ','listing'),
      createData('c', '05/02/2019',' hello ','listing'),
      createData('sdf', '05/02/2019',' hello ','listing'),
      createData('user_dsfsdf', '05/02/2019',' hello ','listing'),
      createData('s', '05/02/2019',' hello ','listing'),
      createData('123', '05/02/2019',' hello ','listing'),
      createData('24', '05/02/2019',' hello ','listing'),
      createData('sddf123dzf', '05/02/2019',' hello ','listing'),
      createData('23', '05/02/2019',' hello ','listing'),
      createData('w34', '05/02/2019',' hello ','listing'),
      createData('sdd12fdzf', '05/02/2019',' hello ','listing'),
    ],
    page: 0,
    rowsPerPage: 5,
  };


  render(){
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);


   return(
    <div className ={classes.root}>
          
         <Paper className={classes.paper}>



          <InboxToolBar numSelected={selected.length} />

           <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
           />

          
           <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">

              
              <InboxTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
               />



               <TableBody>
                {
                  stableSort(data,getSorting(order,orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                   .map(nrow =>{
                     const isSelected =this.isSelected(nrow.id)
                     return(
                        <TableRow
                          hover
                          onClick={event => this.handleClick(event, nrow.id)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={nrow.id}
                          selected={isSelected}
                        >
                          <TableCell padding="checkbox">
                             <Checkbox checked={isSelected}/>
                          </TableCell>

                          <TableCell>
                             {nrow.name}
                          </TableCell>

                          <TableCell>
                             {nrow.messageTitle}
                          </TableCell>

                          <TableCell>
                              {nrow.listingTitle}
                          </TableCell>

                          <TableCell>
                              {nrow.date}
                          </TableCell>

                        </TableRow>
                     );
                   })
                }

                  {emptyRows > 0 && (
                          <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}


               </TableBody>
            </Table>
           </div>


         </Paper>
  
    </div>    
   );
 }
}





ContactInbox.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles, { withTheme: true })(ContactInbox);