package com.pg.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.pg.dtos.ApiResponse;
import com.pg.dtos.CashPaymentReqDTO;
import com.pg.dtos.MonthlyBillRespDTO;
import com.pg.dtos.MonthlyBillsSummaryDTO;
import com.pg.dtos.PaymentRespDTO;
import com.pg.entities.MonthlyBill;
import com.pg.payloads.StripePaymentReqDTO;
import com.stripe.exception.SignatureVerificationException;

public interface PaymentService {
    Map<String, Object> getDashboardMetrics();
    Page<PaymentRespDTO> getPayments(int page, int size, String status, String type, String monthYear, String search);
    
    void processCashPayment(CashPaymentReqDTO req);  
    
    	
    //FOR STRIPE
    Map<String, Object> createStripeSession(StripePaymentReqDTO paymentReq);
    
    public void recordAdvancePayment(String sessionId);
    
    //Recurring payments
//	public ApiResponse generateMonthlyBills(Integer month, Integer year);
	public ApiResponse generateMonthlyBills();

	public List<MonthlyBill> getUnpaidBills(String email);
	Map<String, Object> createBillPaymentSession(Long billId);
	public ApiResponse recordBillPayment(String sessionId,String billId);

	

	//Monthly Payments
	public Page<MonthlyBillRespDTO> getAllMonthlyBills(Pageable pageable);
	public MonthlyBillsSummaryDTO getMonthlyBillsSummary();

}