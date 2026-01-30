import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Modal, InputGroup, ProgressBar, Pagination, Table, Spinner, Badge } from 'react-bootstrap';
// import axios from 'axios';
import axios from '../../service/axiosInstance';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';


const ViewPayments = () => {
  // --- STATE ---
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    failedTransactions: 0, 
    pendingTransactions: 0,
    revenueTrend: []
  });

  const [gridData, setGridData] = useState({ 
    content: [], 
    totalElements: 0,
    totalPages: 0,
    size: 4,
    number: 0
  });
  
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Filters (Backend uses 0-based page index)
  const [filters, setFilters] = useState({
    page: 0, 
    size: 4, 
    status: '', 
    type: '', 
    monthYear: '', 
    search: ''
  });

  // Modal State
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [recordForm, setRecordForm] = useState({ bookingId: '', amount: '', remark: '' });

  // --- API CALLS ---
  
  // 1. Dashboard Metrics (Run once on mount)
  useEffect(() => {
    axios.get(`/admin/payments/dashboard`)
      .then(res => {
        setMetrics(res.data);
      })
      .catch(err => console.error("Dashboard Error:", err));
  }, [refreshKey]);

  // 2. Grid Data (Triggered by filter/page change)
  useEffect(() => {
    setLoading(true);
    axios.post(`/admin/payments`, filters)
      .then(res => {
        console.log("Grid Data Loaded:", res.data);
        setGridData(res.data);
      })
      .catch(err => {
        console.error("Grid Error:", err);
        setGridData({ content: [], totalElements: 0, totalPages: 0, size: 4, number: 0 });
      })
      .finally(() => setLoading(false));
  }, [filters, refreshKey]);

  // --- HANDLERS ---
  
  // Handle Filter Inputs (Reset to Page 0)
  const handleFilter = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val, page: 0 }));
  };

  // Handle Page Change
  const handlePageChange = (pageNum) => {
    setFilters(prev => ({ ...prev, page: pageNum }));
  };

  // Submit New Payment
  const submitNewPayment = async () => {
    if (!recordForm.bookingId || !recordForm.amount) {
      toast.warning('Please fill Booking ID and Amount');
      return;
    }
    try {
      await axios.post(`/admin/payments/cash`, recordForm);
      setShowRecordModal(false);
      setRecordForm({ bookingId: '', amount: '', remark: '' });
      setRefreshKey(k => k + 1);
      toast.success('Payment Recorded Successfully');
    } catch (err) { 
      console.error(err);
      toast.error('Failed to Record Payment'); 
    }
  };

  // --- CALCULATIONS ---
  const currentRevenue = metrics.totalRevenue || 0;
  const estimatedPending = (metrics.pendingTransactions || 0) * 5000;
  const expectedRevenue = currentRevenue + estimatedPending;
  const collectionRate = expectedRevenue > 0 ? (currentRevenue / expectedRevenue) * 100 : 0;

  // --- HELPER FUNCTIONS ---
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit' });
  };

  // Format amount
  const formatAmount = (amount) => {
    return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  };

  // Status badge variant
  const getStatusVariant = (status) => {
    switch(status) {
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'warning';
      case 'FAILED': return 'danger';
      default: return 'secondary';
    }
  };


  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const currentPage = filters.page; // 0-based
    const totalPages = gridData.totalPages || 1;

    // Previous button
    items.push(
      <Pagination.Prev 
        key="prev"
        onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
      />
    );

    // Page numbers
    for (let i = 0; i < totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next 
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
      />
    );

    return items;
  };

  return (
    <div className="min-vh-80 bg-light p-4">
      
      {/* === HEADER SECTION === */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Payment Overview</h4>
          <small className="text-muted">Real-time financial tracking and management</small>
        </div>
        <Button variant="dark" size="sm" onClick={() => setShowRecordModal(true)} className="shadow-sm">
          <i className="fas fa-plus me-2"></i>Record Payment
        </Button>
      </div>

      {/* === TOP SECTION: KPI + GRAPH === */}
      <Row className="g-3 mb-4">
        
        {/* LEFT: KPI CARDS */}
        <Col lg={5}>
          <Card className="border-0 shadow-sm h-100 card-hover">
            <Card.Body className="p-4 d-flex flex-column justify-content-between">
              
              {/* Revenue Progress */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-end mb-3">
                  <div>
                    <small className="text-muted fw-bold text-uppercase" style={{fontSize: '10px', letterSpacing: '0.5px'}}>
                      💰 Current Revenue
                    </small>
                    <h3 className="fw-bold mb-0">₹{currentRevenue.toLocaleString('en-IN')}</h3>
                  </div>
                  <div className="text-end">
                    <small className="text-muted fw-bold text-uppercase" style={{fontSize: '10px', letterSpacing: '0.5px'}}>
                      🎯 Expected
                    </small>
                    <h5 className="fw-bold text-secondary mb-0">₹{expectedRevenue.toLocaleString('en-IN')}</h5>
                  </div>
                </div>
                <ProgressBar now={collectionRate} variant="success" style={{height: '8px', borderRadius: '4px'}} />
                <div className="d-flex justify-content-between mt-2">
                  <small className="text-muted fw-500">{collectionRate.toFixed(1)}% Collected</small>
                  <small className="text-muted fw-500">Target: {expectedRevenue}</small>
                </div>
              </div>

              {/* Status Counts */}
              <Row className="g-3">
                <Col xs={6}>
                  <div className="p-3 rounded text-center" style={{background: '#ffe0e0', borderLeft: '4px solid #dc3545'}}>
                    <h4 className="fw-bold text-danger mb-1">{metrics.failedTransactions || 0}</h4>
                    <small className="text-danger fw-bold" style={{fontSize: '11px'}}>Failed Txns</small>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="p-3 rounded text-center" style={{background: '#fff8e1', borderLeft: '4px solid #ffc107'}}>
                    <h4 className="fw-bold text-warning mb-1">{metrics.pendingTransactions || 0}</h4>
                    <small className="text-warning fw-bold" style={{fontSize: '11px'}}>Pending Txns</small>
                  </div>
                </Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>

        {/* RIGHT: REVENUE CHART */}
        <Col lg={7}>
          <Card className="border-0 shadow-sm h-100 card-hover">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark small text-uppercase m-0">📊 Revenue Trend (Last 3 Months)</h6>
                <small className="text-success fw-bold badge px-2 py-1" style={{background: '#e6f4ea', color: '#137333'}}>
                  📈 +12% vs last month
                </small>
              </div>
              
              {/* Recharts BarChart */}
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={metrics.revenueTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" style={{fontSize: '12px'}} />
                  <YAxis stroke="#666" style={{fontSize: '12px'}} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px'}}
                    formatter={(value) => `₹${value}`}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#343a40" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* === BOTTOM SECTION: TRANSACTIONS TABLE === */}
      <Card className="border-0 shadow-sm card-hover">
        
        {/* Filter Bar */}
        <div className="p-4 border-bottom bg-white d-flex flex-wrap gap-3 align-items-center">
          {/* <InputGroup size="sm" style={{maxWidth: '240px'}}>
            <InputGroup.Text className="bg-light border-end-0"><i className="fas fa-search text-muted"></i></InputGroup.Text>
            <Form.Control 
              placeholder="Search ID, Name..." 
              className="bg-light border-start-0 border" 
              value={filters.search} 
              onChange={e => handleFilter('search', e.target.value)}
              style={{borderColor: '#dee2e6'}}
            />
          </InputGroup> */}

          <Form.Select 
            size="sm" 
            className="bg-light border" 
            style={{width: '140px', borderColor: '#dee2e6'}} 
            value={filters.status} 
            onChange={e => handleFilter('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </Form.Select>
          
          <div className="ms-auto">
            <span className="text-muted small fw-semibold">
              📋 Total Records: <strong>{gridData.totalElements}</strong>
            </span>
          </div>
        </div>

        {/* Table Content */}
        <Card.Body className="p-0">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <Spinner animation="border" variant="dark" />
            </div>
          ) : gridData.content.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center flex-column py-5">
              <i className="fas fa-inbox" style={{fontSize: '48px', color: '#ccc', marginBottom: '16px'}}></i>
              <p className="text-muted fw-500">No payment records found</p>
            </div>
          ) : (
            <>
              {/* Table */}
              <Table hover responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="fw-bold text-dark ps-4">ID</th>
                    <th className="fw-bold text-dark">User</th>
                    <th className="fw-bold text-dark text-end">Amount</th>
                    <th className="fw-bold text-dark text-center">Date</th>
                    <th className="fw-bold text-dark text-center">Method</th>
                    <th className="fw-bold text-dark text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {gridData.content.map((payment, index) => (
                    <tr key={payment.id} className="align-middle">
                      <td className="ps-4 fw-600">{payment.id}</td>
                      <td>
                        <div>
                          <small className="fw-600 d-block">{payment.userName || '—'}</small>
                          <small className="text-muted">{payment.transactionId}</small>
                        </div>
                      </td>
                      <td className="text-end fw-bold text-dark">{formatAmount(payment.amountPaid)}</td>
                      <td className="text-center small">{formatDate(payment.paymentDate)}</td>
                      <td className="text-center">
                        <Badge bg="light" text="dark" className="fw-500">
                          {payment.paymentType}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <Badge bg={getStatusVariant(payment.paymentStatus)} className="fw-500">
                          {payment.paymentStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <div className="d-flex justify-content-center p-4 border-top">
                <Pagination className="mb-0">
                  {generatePaginationItems()}
                </Pagination>
              </div>

              {/* Page Info */}
              <div className="text-center text-muted small p-3 border-top bg-light">
                Showing {gridData.content.length} of {gridData.totalElements} records
                {gridData.totalPages > 0 && ` • Page ${filters.page + 1} of ${gridData.totalPages}`}
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      {/* === MODAL: RECORD PAYMENT === */}
      <Modal show={showRecordModal} onHide={() => setShowRecordModal(false)} centered size="sm" backdrop="static">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="h6 fw-bold">Record Cash Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-4">
          <Form.Group className="mb-3">
            <Form.Label className="small text-muted fw-bold mb-2">Booking ID *</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter booking ID"
              value={recordForm.bookingId}
              onChange={e => setRecordForm({...recordForm, bookingId: e.target.value})}
              className="border"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="small text-muted fw-bold mb-2">Amount (₹) *</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter amount"
              value={recordForm.amount}
              onChange={e => setRecordForm({...recordForm, amount: e.target.value})}
              className="border"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="small text-muted fw-bold mb-2">Remark</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={2}
              placeholder="Optional remarks..."
              value={recordForm.remark}
              onChange={e => setRecordForm({...recordForm, remark: e.target.value})}
              className="border"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0 p-3 pt-0">
          <Button size="sm" className='btn btn-danger' variant="light" onClick={() => setShowRecordModal(false)}>Cancel</Button>
          <Button size="sm"  variant="success" onClick={submitNewPayment}>Confirm Payment</Button>
        </Modal.Footer>
      </Modal>

      {/* === CUSTOM STYLES === */}
      <style>{`
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important;
        }

        .table tbody tr {
          transition: background-color 0.2s ease;
        }
        .table tbody tr:hover {
          background-color: #f8f9fa !important;
        }

        .pagination {
          gap: 4px;
        }

        .pagination .page-link {
          border-radius: 6px;
          border: 1px solid #dee2e6;
          color: #495057;
          font-weight: 500;
          min-width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .pagination .page-link:hover:not(.active) {
          background-color: #f8f9fa;
          border-color: #adb5bd;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .pagination .page-item.active .page-link {
          background-color: #212529;
          border-color: #212529;
          color: white;
        }

        .pagination .page-item.disabled .page-link {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .fw-600 {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default ViewPayments;