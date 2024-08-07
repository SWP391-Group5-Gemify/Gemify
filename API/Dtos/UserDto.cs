﻿using Core.Enitities;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; } 
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Status { get; set; }
        public string Image_Url { get; set; }
        public string Address { get; set; }
        public string Role {  get; set; }
    }
}
