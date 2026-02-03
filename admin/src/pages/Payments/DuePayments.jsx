import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Form, Button, Modal, Pagination, Table, Spinner, Badge, ProgressBar } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../../service/axiosInstance';

// --- CONFIGURATION ---
const PAGE_SIZE = 5;

const DuePayments = () => {
  // --- STATE ---
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [summary, setSummary] = useState({ totalRecords: 0, unpaidCount: 0, totalOutstanding: 0, collectionRate: 0 });

  // Filters
  const [filters, setFilters] = useState({
    status: '', // 'UNPAID', 'PAID', 'OVERDUE'
    search: '',
    month: '',
    year: ''
  });

  // Modal State
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [payForm, setPayForm] = useState({ amount: '', paymentType: 'CASH', remark: '' });

  // --- API CALLS ---

  // 1. Fetch Bills (Table Data)
  useEffect(() => {
    fetchBills();
  }, [currentPage, filters]);

  // 2. Fetch Summary (KPI Data)
  useEffect(() => {
    fetchSummary();
  }, [filters]); // Refetch summary when filters change (optional, or keep independent)

  const fetchBills = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        size: PAGE_SIZE,
        status: filters.status || 'ALL',
        month: filters.month || null,
        year: filters.year || null,
        search: filters.search
      };

      const { data } = await axios.get('/admin/payments/monthly-bills', { params });

      setBills(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (error) {
      console.error('Fetch Error:', error);
      toast.error('Failed to load monthly bills');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      // You can pass filters here too if you want summary to reflect filtered view
      const { data } = await axios.get('/admin/payments/monthly-bills/summary');
      setSummary(data);
    } catch (error) {
      console.error('Summary error:', error);
    }
  };

  // --- HANDLERS ---
  const handleFilter = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setCurrentPage(0); // Reset to page 0 on filter change
  };

  const handlePayClick = (bill) => {
    setSelectedBill(bill);
    setPayForm({ amount: bill.amount, paymentType: 'CASH', remark: '' }); // Default to full amount
    setShowPayModal(true);
  };

  const submitPayment = async () => {
    if (!payForm.amount) return toast.error('Enter amount');

    //NOT Tested
    try {
      await axios.post(`/admin/payments/monthly-bills/${selectedBill.billId}/pay`, {
        billId: selectedBill.billId,
        amount: payForm.amount,
        paymentType: payForm.paymentType,
        remark: payForm.remark
      });

      toast.success('Payment recorded successfully');
      setShowPayModal(false);
      fetchBills(); // Refresh table
      fetchSummary(); // Refresh stats
    } catch (error) {
      console.error(error);
      toast.error('Failed to record payment');
    }
  };

  // --- HELPERS ---
  const formatAmount = (val) => '₹' + (val || 0).toLocaleString('en-IN');
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const getStatusVariant = (status) => {
    switch (status) {
      case 'PAID': return 'success';
      case 'UNPAID': return 'warning';
      case 'OVERDUE': return 'danger';
      default: return 'secondary';
    }
  };

  // Mock Graph Data (Replace with summary logic if available)
  const graphData = [
    { month: 'Nov', outstanding: 45000, collected: 120000 },
    { month: 'Dec', outstanding: 32000, collected: 135000 },
    { month: 'Jan', outstanding: summary.totalOutstanding || 0, collected: summary.totalCollected || 0 },
  ];

  // Pagination Logic
  const generatePagination = () => {
    let items = [];
    for (let i = 0; i < totalPages; i++) {
      items.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
          {i + 1}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className="min-vh-80 bg-light p-4">

      {/* === HEADER === */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Monthly Bills</h4>
          <small className="text-muted">Track rent and recurring payments</small>
        </div>
        <Button variant="dark" size="sm" className="shadow-sm" onClick={() => toast('Generate bills feature coming soon!')}>
          <i className="fas fa-magic me-2"></i>Generate Bills
        </Button>
      </div>

      {/* === KPI + GRAPH === */}
      <Row className="g-3 mb-4">
        {/* KPI */}
        <Col lg={5}>
          <Card className="border-0 shadow-sm h-100 card-hover">
            <Card.Body className="p-4 d-flex flex-column justify-content-between">
              <div>
                <small className="text-muted fw-bold text-uppercase" style={{ fontSize: '10px' }}>💰 Total Outstanding</small>
                <h3 className="fw-bold mb-0 text-danger">{formatAmount(summary.totalOutstanding)}</h3>
                <ProgressBar now={summary.collectionRate || 0} variant="success" className="mt-3" style={{ height: '6px' }} />
                <div className="d-flex justify-content-between mt-2">
                  <small className="text-muted">{summary.collectionRate || 0}% Collected</small>
                  {/* <small className="text-muted">Target: {summary.collectionRate}</small> */}
                </div>
              </div>

              <Row className="g-3 mt-4">
                <Col xs={6}>
                  <div className="p-3 rounded text-center" style={{ background: '#fff3cd', borderLeft: '4px solid #ffc107' }}>
                    <h4 className="fw-bold text-warning mb-1">{summary.unpaidCount}</h4>
                    <small className="text-warning fw-bold" style={{ fontSize: '11px' }}>Unpaid Bills</small>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="p-3 rounded text-center" style={{ background: '#e2e3e5', borderLeft: '4px solid #6c757d' }}>
                    <h4 className="fw-bold text-secondary mb-1">{summary.totalRecords}</h4>
                    <small className="text-secondary fw-bold" style={{ fontSize: '11px' }}>Total Records</small>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* GRAPH */}
        <Col lg={7}>
          <Card className="border-0 shadow-sm h-100 card-hover">
            <Card.Body className="p-4">
              <h6 className="fw-bold text-dark small text-uppercase mb-3">📊 Collection Trend</h6>
              <small className="text-black badge my-1">
                real trends coming soon
              </small>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ borderRadius: '4px' }} formatter={(val) => `₹${val}`} />
                  <Legend />
                  <Bar dataKey="collected" fill="#343a40" name="Collected" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="outstanding" fill="#dc3545" name="Outstanding" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* === TABLE === */}
      <Card className="border-0 shadow-sm card-hover">
        {/* Filter Bar */}
        <div className="p-4 border-bottom bg-white d-flex flex-wrap gap-3 align-items-center">
          <Form.Select size="sm" className="bg-light border" style={{ width: '140px' }}
            // value={filters.status} onChange={e => handleFilter('status', e.target.value)}>
            value={filters.status} onChange={() => toast('Filters feature coming soon!')}>
            <option value="">All Status</option>
            <option value="UNPAID">Unpaid</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
          </Form.Select>

          <Form.Select size="sm" className="bg-light border" style={{ width: '140px' }}
            // value={filters.month} onChange={e => handleFilter('month', e.target.value)}>
            value={filters.month} onChange={() => toast('Filters feature coming soon!')}>
            <option value="">All Months</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
          </Form.Select>

          <div className="ms-auto">
            <span className="text-muted small fw-semibold">📋 Total Records: <strong>{totalElements}</strong></span>
          </div>
        </div>

        <Card.Body className="p-0">
          {loading ? (
            <div className="d-flex justify-content-center py-5"><Spinner animation="border" variant="dark" /></div>
          ) : bills.length === 0 ? (
            <div className="text-center py-5 text-muted">No monthly bills found.</div>
          ) : (
            <>
              <Table hover responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4">Bill ID</th>
                    <th>Booking</th>
                    <th>Period</th>
                    <th className="text-end">Amount</th>
                    <th className="text-center">Due Date</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map(bill => (
                    <tr key={bill.billId} className="align-middle">
                      <td className="ps-4 fw-600">#{bill.billId}</td>
                      <td>
                        <small className="d-block fw-bold">Booking #{bill.bookingId}</small>
                        <small className="text-muted">Room Info</small>
                      </td>
                      <td>{bill.monthName} {bill.year}</td>
                      <td className="text-end fw-bold">{formatAmount(bill.amount)}</td>
                      <td className="text-center small">{formatDate(bill.dueDate)}</td>
                      <td className="text-center">
                        <Badge bg={getStatusVariant(bill.status)} className="fw-500">{bill.status}</Badge>
                      </td>
                      <td className="text-center">
                        {bill.status === 'UNPAID' && (
                          // <Button size="sm" variant="outline-dark" onClick={() => handlePayClick(bill)}>
                          <Button size="sm" variant="outline-dark" onClick={() => toast('Pay feature coming soon!')}>


                            Pay
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <div className="d-flex justify-content-center p-4 border-top">
                <Pagination className="mb-0">{generatePagination()}</Pagination>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      {/* === MODAL: RECORD PAYMENT === */}
      <Modal show={showPayModal} onHide={() => setShowPayModal(false)} centered size="sm" backdrop="static">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="h6 fw-bold">Record Bill Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-4">
          <p className="text-muted small mb-3">Recording payment for <strong>Bill #{selectedBill?.billId}</strong></p>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold">Amount</Form.Label>
            <Form.Control type="number" value={payForm.amount} onChange={e => setPayForm({ ...payForm, amount: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold">Type</Form.Label>
            <Form.Select value={payForm.paymentType} onChange={e => setPayForm({ ...payForm, paymentType: e.target.value })}>
              <option value="CASH">Cash</option>
              <option value="UPI">UPI</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="small fw-bold">Remark</Form.Label>
            <Form.Control as="textarea" rows={2} value={payForm.remark} onChange={e => setPayForm({ ...payForm, remark: e.target.value })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0 p-3 pt-0">
          <Button variant="light" size="sm" onClick={() => setShowPayModal(false)}>Cancel</Button>
          <Button variant="dark" size="sm" onClick={submitPayment}>Confirm Payment</Button>
        </Modal.Footer>
      </Modal>

      {/* STYLES */}
      <style>{`
        .card-hover:hover { box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important; transition: all 0.3s ease; }
        .table tbody tr:hover { background-color: #f8f9fa !important; }
        .fw-600 { font-weight: 600; }
        .pagination .page-link { border-radius: 6px; color: #333; margin: 0 2px; }
        .pagination .page-item.active .page-link { background: #333; border-color: #333; color: #fff; }
      `}</style>
    </div>
  );
};

export default DuePayments;
