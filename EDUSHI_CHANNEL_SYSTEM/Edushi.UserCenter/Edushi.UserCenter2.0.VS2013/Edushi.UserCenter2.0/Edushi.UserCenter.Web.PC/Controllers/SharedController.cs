�}`� r v  ��;��s��a	����_���}������g���-����� _��]\	�8c�j�؝���[�
@fiqBu���_�N���X7��^��}oc�5��E]�	Ϻ'��XS��2�k�}�a�����e�
G��C��q�"V  �`���W��#�n�#=u�J4��Ċv@��:��mQWY��!W���d���
�l�L��͸�Fy8��̃T�b׷~*�K�zAX��x>�bU�t�R��
��s>��s�1��aR����m� �{v�hT�{t���x.�?��h��/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�tp://www.edushi.com/top.html", string.Empty); 
            return PartialView();
        }

        public PartialViewResult Footer()
        {
            ViewBag.FooterHtml = DataHelper.HttpPost("http://www.edushi.com/footer.html", string.Empty);
            return PartialView();
        }

    }
}
