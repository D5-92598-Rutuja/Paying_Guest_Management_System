import { useState } from "react";
import axios from "../../service/axiosInstance";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    setLoading(true);
    try {
      // await axios.post("/auth/password/forgot", null, {
      //   params: { email }});
      await axios.post("/auth/password/forgot", { email });

      
      alert("Reset link sent to your email");
    } catch {
      alert("Email not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient"
         style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{maxWidth: '420px', width: '100%'}}>
        {/* Gradient top bar */}
        <div className="bg-gradient position-absolute top-0 start-0 end-0" 
             style={{height: '4px', background: 'linear-gradient(90deg, #667eea, #764ba2)'}}></div>
        
        <div className="card-body p-5 p-md-4">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-4 p-3"
                 style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea, #764ba2)', boxShadow: '0 10px 30px rgba(102,126,234,0.4)'}}>
              <i className="bi bi-envelope-fill text-white fs-1"></i>
            </div>
            <h1 className="h2 fw-bold mb-2 lh-1-2" 
                style={{background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Forgot Password?
            </h1>
            <p className="text-muted mb-0">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Form */}
          <div className="mb-4">
            <div className="position-relative">
              <i className="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input
                type="email"
                className="form-control form-control-lg ps-5 rounded-3 border-2 shadow-sm"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{backgroundColor: '#fafbfc', borderColor: '#e2e8f0', transition: 'all 0.3s ease'}}
              />
            </div>
          </div>

          <button
            className="btn btn-lg w-100 rounded-3 fw-semibold shadow-lg mb-4"
            style={{
              background: 'linear-gradient(135deg,  #667eea, #764ba2)',
              border: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onClick={submit}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

          {/* Footer */}
          <div className="text-center">
            <p className="text-muted mb-0">
              Remember your password?{" "}
              <a href="/login" className="text-decoration-none fw-semibold" style={{color: '#667eea'}}>
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
