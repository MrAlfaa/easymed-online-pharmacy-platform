import React from 'react'
 
export const AdminNavbar = ({name}) => {
    return (
            <nav class="navbar fixed-top navbar-expand-md navbar-dark  mb-3" style={{backgroundColor:"#D9D9D9"}}>
                <div class="flex-row d-flex">
                    <button type="button" class="navbar-toggler mr-2 " data-toggle="offcanvas" title="Toggle responsive left sidebar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand ml-0 text-dark font-weight-bold" href="#" >{name}</a>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse" id="collapsingNavbar">
                   
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                          
                        </li>
                        <li class="nav-item">
                           
                        </li>
                        <li class="nav-item">
                  <a class="nav-link waves-effect waves-light text-white" href='#'>
                  <i class="bi bi-bell-fill"></i>
                  </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link  text-black" href='#'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-bell-fill" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
</svg>
                    </a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link waves-effect waves-light text-white" href='#'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>
                      </a>
                    </li>
                    </ul>
                </div>
       </nav>
    )
}
