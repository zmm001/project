�}�� r �
  �	���R���a	��� �ӟ���}��U��>�2W�uO�7���������.0�7�X��xOgE�%	ɋYm]�c�2�L7,,�����/�E9�i�oධ�������wp�nAq��؍�jLu��o>�Ũ_�t*j��٧�KM��ӿ�ۨB�xm���}tx*��~��rEޮ ����x����Z��b������>"ῖU7\���e��@r:�G�.�R�T���e�p'
�����w��[�)�6��CY�i�b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�   }

        private string invitationMessage;
        public string InvitationMessage
        {
            get
            {
                return invitationMessage;
            }
        }

        private void btn_Click(object sender, EventArgs e)
        {
            account = txtAccount.Text;
            invitationMessage = txtInvitation.Text;

            Close();
        }
    }
}