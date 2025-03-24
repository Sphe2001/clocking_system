import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' || path === '/signup' || path ==='/adminlogin' || path ==='/forgotpassword/admin'
        || path ==='/forgotpassword/supervisor' || path ==='/forgotpassword/student' || path ==='/verifyresetlink' 
        || path ==='/resetpassword/student' || path ==='/resetpassword/supervisor' || path ==='/resetpassword/admin' 


  const token = request.cookies.get('token')?.value || ''

  if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/signup',
    '/adminlogin',
    '/dashboard/student',
    '/dashboard/student/viewProfile',
    '/dashboard/admin',
    '/dashboard/admin/users',
    '/dashboard/admin/reports',
    '/dashboard/admin/profile',
    '/dashboard/supervisor',
    '/dashboard/supervisor/viewStudents',
    '/dashboard/supervisor/viewProfile',
    '/forgotpassword/admin',
    '/forgotpassword/student',
    '/forgotpassword/supervisor',
    '/resetpassword/admin',
    '/resetpassword/student',
    '/resetpassword/supervisor',
    '/verifyresetlink',
    
  ],
}